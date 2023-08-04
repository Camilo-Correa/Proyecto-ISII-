import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { AppDataSource } from '../data-source'
import { generateToken, getToken } from '../utils/authUtils'
import bcrypt from 'bcrypt'

export class UserController {}

export async function createUser(req: Request, res: Response) {
  const { firstName, lastName, password, email, phone, location } = req.body

  if (!firstName || !lastName || !password || !email || !phone || !location)
    return res.status(400).json({ message: 'Faltan datos' })

  const findUser = await AppDataSource.manager.findOne(User, {
    where: { email },
  })
  if (findUser) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }

  const newUser = new User()
  newUser.firstName = firstName
  newUser.lastName = lastName
  newUser.password = await bcrypt.hash(password, 10)
  newUser.email = email
  newUser.phone = phone
  newUser.location = location
  const token = generateToken({ code: newUser.code })
  newUser.authToken = token
  await AppDataSource.manager.save(newUser)
  delete newUser.password
  return res.json({
    token,
    role: newUser.role,
    code: newUser.code,
  })
}

export async function getUsers(req: Request, res: Response) {
  const token = getToken(req)
  let users = await AppDataSource.manager.find(User)
  users = users.filter((user) => user.authToken !== token)
  users.forEach((user) => {
    delete user.authToken
    delete user.password
  })
  res.json(users)
}

export async function getUserByCode(req: Request, res: Response) {
  // Aquí iría la lógica para obtener un usuario por su ID de la base de datos
  const code = req.query.code as string
  if (!code)
    return res.status(400).json({ message: 'Falta el código del usuario' })
  const user = await AppDataSource.manager.findOne(User, {
    where: { code },
    relations: ['products.category', 'reviews', 'favorites.category'],
  })
  if (user) {
    return res.json(user)
  } else {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
}

export async function updateUser(req: Request, res: Response) {
  // Aquí iría la lógica para actualizar un usuario en la base de datos
  const code = req.query.code as string
  if (!code)
    return res.status(400).json({ message: 'Falta el código del usuario' })
  const user = await AppDataSource.manager.findOne(User, { where: { code } })
  if (user) {
    const updatedUser = req.body
    await AppDataSource.manager.update(User, code, updatedUser)
    return res.json(updatedUser)
  } else {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
}

export function deleteUser(req: Request, res: Response) {
  // Aquí iría la lógica para eliminar un usuario de la base de datos
  const code = req.query.code as string
  if (!code)
    return res.status(400).json({ message: 'Falta el código del usuario' })
  const user = AppDataSource.manager.findOne(User, { where: { code } })
  if (user) {
    AppDataSource.manager.delete(User, code)
    return res.json({ message: 'Usuario eliminado' })
  }
  return res.status(404).json({ message: 'Usuario no encontrado' })
}
