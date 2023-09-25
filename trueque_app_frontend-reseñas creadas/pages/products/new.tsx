'use client'

import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import PublishIcon from '@mui/icons-material/Publish'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/authReducer'
import { Category } from '../../model/category.model'
import withAuth from '../../components/withAuth'
import CustomAppBar from '../../components/appBar'
import { GETCategories, POSTProduct } from '../../api/products.api'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const NewProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertState, setAlertState] = useState<AlertColor>('error')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [image, setImage] = useState<File>()
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    const res = await GETCategories()
    if (res.status === 200) {
      const categories = (await res.json()) as Category[]
      setCategories(categories)
      setSelectedCategory(categories[0])
    }
    setIsLoading(false)
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    const category = categories.find(
      (category) => category.code === event.target.value,
    )
    setSelectedCategory(category)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (showError) setShowError(false)
    if (showAlert) setShowAlert(false)
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (showError) setShowError(false)
    if (showAlert) setShowAlert(false)
    setDescription(event.target.value)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (showError) setShowError(false)
    if (showAlert) setShowAlert(false)
    setPrice(event.target.value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (showError) setShowError(false)
    if (showAlert) setShowAlert(false)
    setImage(event.target.files[0])
  }

  const handleSubmit = async () => {
    if (title === '' || description === '' || price === '' || !image) {
      setShowError(true)
      setShowAlert(true)
      setAlertState('error')
      setAlertMessage('Por favor, rellena todos los campos o sube una imagen')
      return
    }
    const res = await POSTProduct(state.token, {
      title,
      description,
      price,
      categoryCode: selectedCategory.code,
      image,
    })
    if (res.status === 200) {
      setAlertState('success')
      setShowAlert(true)
      setAlertMessage('Producto creado correctamente')
      setTimeout(() => {
        setShowAlert(false)
        router.push('/')
      }, 3000)
    }
  }

  return (
    <Box flexGrow={1}>
      <CustomAppBar />
      <Container>
        <Box my={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          {showAlert && (
            <Box my={2}>
              <Alert severity={alertState}>{alertMessage}</Alert>
            </Box>
          )}
          {image && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={URL.createObjectURL(image)} width={350} />
              {image.name}
            </Box>
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Subir imagen
            <VisuallyHiddenInput
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
          <Box my={2}>
            <TextField
              id="title"
              label="Titulo"
              variant="outlined"
              onChange={handleTitleChange}
              error={showError && title === ''}
            />
          </Box>
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            multiline
            maxRows={8}
            onChange={handleDescriptionChange}
            error={showError && description === ''}
          />
          <Box my={2}>
            <TextField
              id="price"
              label="Precio"
              variant="outlined"
              onChange={handlePriceChange}
              error={showError && price === ''}
              inputProps={{ type: 'number' }}
            />
          </Box>
          {isLoading ? (
            <Box textAlign={'center'} my={2}>
              <CircularProgress />
            </Box>
          ) : (
            <Box my={2}>
              <InputLabel id="demo-simple-select-standard-label">
                Categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="categoryCode"
                value={selectedCategory.code}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category.code}>{category.name}</MenuItem>
                ))}
              </Select>
            </Box>
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<PublishIcon />}
            onClick={handleSubmit}
          >
            Crear
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default withAuth(NewProductPage)
