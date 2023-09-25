import { CreateProductProps } from '../model/product.model'

export async function GETproducts() {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function GETCategories() {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function POSTProduct(token: string, props: CreateProductProps) {
  try {
    const formData = new FormData()
    formData.append('title', props.title)
    formData.append('description', props.description)
    formData.append('price', props.price)
    formData.append('categoryCode', props.categoryCode)
    formData.append('image', props.image)
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}
