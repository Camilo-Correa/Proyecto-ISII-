export async function PUTloginUser(name: string, password: string) {
  try {
    console.log('name', name);
    console.log('password', password);
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      }
    );
    return resp.json();
  } catch (error) {
    console.log(error);
  }
}
