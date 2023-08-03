import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { AppDataSource } from '../data-source'
import bcrypt from 'bcrypt'

export async function loginUser(req: Request, res: Response) {
  // Aquí iría la lógica para validar las credenciales y generar el token JWT
  const { email, password } = req.body.data || req.body
  if (!email || !password)
    return res.status(400).json({ message: 'Faltan credenciales' })
  const user = new User()
  user.email = email

  // Buscamos el usuario en la base de datos y
  // comprobamos si las credenciales son válidas
  const findUser = await AppDataSource.manager.findOne(User, {
    where: { email },
  })
  if (findUser) {
    const isPasswordValid = await bcrypt.compare(password, findUser.password)
    if (isPasswordValid) {
      const token = findUser.authToken
      return res.json({ token, role: findUser.role, code: findUser.code })
    }
  }
  return res.status(401).json({ message: 'Credenciales inválidas' })
}
