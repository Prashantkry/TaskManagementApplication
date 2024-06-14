import express from 'express'
import { loginController } from '../controller/loginController'
const loginRoutes = express.Router()

loginRoutes.post('/', loginController)

export default loginRoutes