'use client'

import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
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
import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    )
  },
)

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
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          my={3}
        >
          {showAlert && <Alert severity={alertState}>{alertMessage}</Alert>}
          {image && (
            <>
              <img src={URL.createObjectURL(image)} width={350} />
              {image.name}
            </>
          )}
          <Button
            component="label"
            variant="contained"
            color={showError && !image ? 'error' : 'primary'}
            startIcon={<CloudUploadIcon />}
          >
            Subir imagen
            <VisuallyHiddenInput
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
          <TextField
            id="title"
            label="Titulo"
            variant="outlined"
            fullWidth
            onChange={handleTitleChange}
            error={showError && title === ''}
          />
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            multiline
            fullWidth
            maxRows={8}
            onChange={handleDescriptionChange}
            error={showError && description === ''}
          />
          <TextField
            id="price"
            label="Precio"
            fullWidth
            onChange={handlePriceChange}
            error={showError && price === ''}
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
          />

          {isLoading ? (
            <CircularProgress />
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory?.code}
                label="Categoria"
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category.code}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<PublishIcon />}
            onClick={handleSubmit}
          >
            Crear
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default withAuth(NewProductPage)
