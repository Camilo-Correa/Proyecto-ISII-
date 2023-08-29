import app from './app'
import { AppDataSource } from './data-source'

const PORT = process.env.PORT || 3000

AppDataSource.initialize().then(async () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/api`)
  })
})
