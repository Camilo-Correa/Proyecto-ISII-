// validate email string
export default function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
