import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { Product, State } from '../model/product.model'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authReducer'

const ProductCard = (product: Product) => {
  const router = useRouter()
  const { state } = useAuth()
  function toMoneyString(value: string) {
    return `$${value}`
  }

  const getChipLabel = (productState: State) => {
    switch (productState) {
      case State.VISIBLE:
        return <></>
      case State.HIDDEN:
        return <Chip label="Oculto" />
      case State.DELETED:
        return <Chip color="error" label="Eliminado" />
      default:
        return <></>
    }
  }

  return (
    <Card
      sx={{ maxWidth: 345 }}
      key={product.code}
      onClick={() => {
        router.push(`/products/${product.code}`)
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.imageUrl}`}
          alt={product.title}
        />
        <CardContent>
          {state.role === 'ADMIN' && (
            <Box my={2}>{getChipLabel(product.state)}</Box>
          )}
          <Typography variant="h5" noWrap paragraph>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" noWrap paragraph>
            {product.category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {toMoneyString(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ProductCard
