'use client'

import {
  Alert,
  Box,
  Button,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import { FC, useEffect, useState } from 'react'
import styles from '../../styles/globals.module.css'
import CustomAppBar from '../../components/appBar'
import { Product, State, UpdateProductProps } from '../../model/product.model'
import {
  DELETEproduct,
  GETCategories,
  GETproduct,
  POSTReview,
  PUTproduct,
} from '../../api/products.api'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useAuth } from '../../context/authReducer'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import { Category } from '../../model/category.model'
import ReviewCard from '../../components/reviewCard'
import AddIcon from '@mui/icons-material/Add'
import { Review } from '../../model/review.model'

type PageProps = {
  code: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { code } = params as { code: string }
  return {
    props: {
      code,
    },
  }
}

const page: FC<PageProps> = ({ code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<Product>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [openDeleteProductDialog, setOpenDeleteProductDialog] = useState(false)
  const [openEditProductDialog, setOpenEditProductDialog] = useState(false)
  const [openReviewDialog, setOpenReviewDialog] = useState(false)
  const [review, setReview] = useState<Review>(null)
  const [productToEdit, setProductToEdit] = useState<UpdateProductProps>(null)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { state } = useAuth()
  const [errorReview, setErrorReview] = useState<boolean>(false)

  async function getProduct() {
    const res = await GETproduct(code)
    if (res.status === 200) {
      const product = (await res.json()) as Product
      setProduct(product)
    }
    setIsLoading(false)
  }

  async function getCategories() {
    const res = await GETCategories()
    if (res.status === 200) {
      const categories = (await res.json()) as Category[]
      setCategories(categories)
    }
    setIsLoading(false)
  }

  async function deleteProduct() {
    setIsLoading(true)
    await DELETEproduct(state.token, code)
    setShowAlert(true)
    setAlertMessage('Producto eliminado')
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    getProduct()
  }

  async function editProduct(product: UpdateProductProps) {
    setIsLoading(true)
    await PUTproduct(code, state.token, product)
    setShowAlert(true)
    setAlertMessage('Producto editado corectamente')
    getProduct()
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  async function createReview() {
    setIsLoading(true)
    await POSTReview(code, state.token, review)
    setShowAlert(true)
    setAlertMessage('Reseña creada corectamente')
    getProduct()
    setReview(null)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  useEffect(() => {
    getProduct()
    getCategories()
  }, [])

  if (isLoading)
    return (
      <div className={styles.root}>
        <CircularProgress />
      </div>
    )

  const getChipLabel = (productState: State) => {
    switch (productState) {
      case State.VISIBLE:
        return <Chip color="success" label="Visible" />
      case State.HIDDEN:
        return <Chip label="Oculto" />
      case State.DELETED:
        return <Chip color="error" label="Eliminado" />
      default:
        return <Chip color="success" label="Visible" />
    }
  }

  return (
    <Box>
      <CustomAppBar />
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          my={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {state?.role === 'ADMIN' && getChipLabel(product?.state)}
            <Typography variant="h2" align="center">
              {product?.title}
            </Typography>
            {state?.role === 'ADMIN' && (
              <>
                {product?.state !== State.DELETED && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    onClick={() => {
                      setOpenDeleteProductDialog(true)
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                )}
                {product?.state === State.DELETED && (
                  <IconButton
                    aria-label="visible"
                    size="large"
                    color="success"
                    onClick={() => {
                      editProduct({ state: State.VISIBLE })
                    }}
                  >
                    <VisibilityIcon fontSize="inherit" />
                  </IconButton>
                )}
                <IconButton
                  aria-label="visible"
                  size="large"
                  color="primary"
                  onClick={() => {
                    setProductToEdit({
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      category: product.category.code,
                      state: product.state,
                    })
                    setOpenEditProductDialog(true)
                  }}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </>
            )}
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product?.imageUrl}`}
              height={400}
            />
            <Stack direction="column" spacing={3}>
              <Typography variant="subtitle2" align="left">
                Categoria: {product?.category.name}
              </Typography>
              <Typography variant="subtitle1" align="left">
                {product?.description}
              </Typography>
              <Typography variant="h4" align="left">
                {USDollar.format(parseInt(product?.price))} cop
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                onClick={() => {
                  // redirect wssp link https://wa.me/<number>
                  window.open(
                    `https://wa.me/57${product.user.phone}?text=Hola, estoy interesado en el producto ${product?.title}`,
                    '_blank',
                  )
                }}
              >
                Contactar con el vendedor
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Box my={2}>
            <Typography variant="h4" align="left">
              Reseñas:
            </Typography>
          </Box>
          {product?.reviews.length > 0 && (
            <Stack direction="column" spacing={3}>
              {product?.reviews.map((review) => <ReviewCard review={review} />)}
            </Stack>
          )}
          {state?.role === 'USER' && (
            <Box my={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpenReviewDialog(true)
                }}
              >
                Crear reseña
              </Button>
            </Box>
          )}
        </Stack>
      </Container>
      <Dialog
        open={openDeleteProductDialog}
        onClose={() => setOpenDeleteProductDialog(false)}
      >
        <DialogTitle id="alert-dialog-title">
          ¿Eliminar el producto {product?.title}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteProductDialog(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteProductDialog(false)
              deleteProduct()
            }}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {productToEdit && (
        <Dialog
          open={openEditProductDialog}
          onClose={() => setOpenEditProductDialog(false)}
        >
          <DialogTitle id="alert-dialog-title">
            ¿Editar {product.title}?
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Titulo"
              variant="outlined"
              fullWidth
              value={productToEdit.title}
              onChange={(event) =>
                setProductToEdit({
                  ...productToEdit,
                  title: event.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              maxRows={8}
              value={productToEdit.description}
              onChange={(event) =>
                setProductToEdit({
                  ...productToEdit,
                  description: event.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              inputProps={{ type: 'number' }}
              value={productToEdit.price}
              onChange={(event) =>
                setProductToEdit({
                  ...productToEdit,
                  price: event.target.value,
                })
              }
              margin="normal"
            />
            <Box marginTop={1}>
              <Box marginBottom={1}>
                <InputLabel id="demo-simple-select-standard-label">
                  Categoria
                </InputLabel>
              </Box>
              <Select
                labelId="demo-simple-select-standard-label"
                id="categoryCode"
                value={productToEdit.category}
                onChange={(event: SelectChangeEvent) => {
                  setProductToEdit({
                    ...productToEdit,
                    category: event.target.value,
                  })
                }}
              >
                {categories.map((category) => (
                  <MenuItem value={category.code}>{category.name}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box marginTop={1}>
              <Box marginBottom={1}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estado
                </InputLabel>
              </Box>
              <Select
                labelId="demo-simple-select-standard-label"
                id="categoryCode"
                value={productToEdit.state}
                onChange={(event: SelectChangeEvent) => {
                  setProductToEdit({
                    ...productToEdit,
                    state: event.target.value as State,
                  })
                }}
              >
                <MenuItem value={State.VISIBLE}>Visible</MenuItem>
                <MenuItem value={State.HIDDEN}>Oculto</MenuItem>
                <MenuItem value={State.DELETED}>Eliminado</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenEditProductDialog(false)
                editProduct(productToEdit)
                setProductToEdit(null)
              }}
              autoFocus
            >
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
      >
        <DialogTitle id="alert-dialog-title">Reseñar producto</DialogTitle>
        <DialogContent>
          <TextField
            label="Titulo"
            variant="outlined"
            fullWidth
            value={review?.tittle}
            onChange={(event) =>
              setReview({ ...review, tittle: event.target.value })
            }
            error={errorReview && !review?.tittle}
            helperText={errorReview && !review?.tittle && 'Campo requerido'}
            margin="normal"
          />
          <Box my={2}>
            <Rating
              name="simple-controlled"
              value={review?.qualification}
              onChange={(event, newValue) => {
                setReview({ ...review, qualification: newValue })
              }}
            />
          </Box>
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            value={review?.description}
            onChange={(event) =>
              setReview({ ...review, description: event.target.value })
            }
            margin="normal"
            error={errorReview && !review?.description}
            helperText={
              errorReview && !review?.description && 'Campo requerido'
            }
            multiline
            maxRows={8}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (
                review?.tittle &&
                review?.tittle !== '' &&
                review?.description &&
                review?.description !== ''
              ) {
                setErrorReview(false)
                setOpenReviewDialog(false)
                createReview()
              } else {
                setErrorReview(true)
              }
            }}
            autoFocus
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default page
