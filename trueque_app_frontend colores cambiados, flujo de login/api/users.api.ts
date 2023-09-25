import { User } from '../model/user.model'

export async function GETusers(token: string) {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function DELETEuser(token: string, code: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/?code=${code}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function PUTuser(token: string, code: string, user: User) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/?code=${code}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      },
    )
    return resp
  } catch (error) {
    console.log(error)
  }
}

export async function GETuser(code: string) {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user?code=${code}`,
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
