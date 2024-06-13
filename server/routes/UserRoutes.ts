import express from 'express'
import { createUser, readAndUpdateUser, deleteUser } from '../controller/User'

const UserRoute = express.Router()
UserRoute.post('/', createUser)
UserRoute.put('/', readAndUpdateUser)
UserRoute.delete('/', deleteUser)

export default UserRoute