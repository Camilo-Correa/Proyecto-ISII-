import { Request, Response, NextFunction } from 'express'
import { getToken, verifyToken } from '../utils/authUtils'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = getToken(req)

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. Token no proporcionado.' })
  }

  const user = verifyToken(token)

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. Token inválido o expirado.' })
  }

  // Agrega el objeto user a la solicitud para que esté disponible en las rutas protegidas
  // req.user = user;

  next()
}
