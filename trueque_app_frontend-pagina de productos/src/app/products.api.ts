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
