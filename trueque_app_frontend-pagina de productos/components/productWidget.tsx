import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Product } from '../model/product.model'

const ProductWidget = (product: Product) => {
  function toMoneyString(value: string) {
    return `$${value}`
  }

  return (
    <Card sx={{ maxWidth: 345 }} key={product.code}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.imageUrl}`}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" noWrap paragraph>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {toMoneyString(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ProductWidget
