import {
  CreateProductProps,
  Product,
  UpdateProductProps,
} from '../model/product.model'
import { Review } from '../model/review.model'

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

export async function GETproduct(code: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/product?code=${code}`,
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

export async function DELETEproduct(token: string, code: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/product?code=${code}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function PUTproduct(
  code: string,
  token: string,
  product: UpdateProductProps,
) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/product?code=${code}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function POSTReview(code: string, token: string, review: Review) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/review?code=${code}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}
