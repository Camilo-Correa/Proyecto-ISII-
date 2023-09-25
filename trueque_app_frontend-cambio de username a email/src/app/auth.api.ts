export async function PUTloginUser(email: string, password: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}
