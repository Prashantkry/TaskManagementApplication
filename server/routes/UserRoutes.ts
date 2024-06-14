import express from 'express'
import { createUser } from '../controller/User'

const UserRoute = express.Router()
UserRoute.post('/', createUser)
export default UserRoute