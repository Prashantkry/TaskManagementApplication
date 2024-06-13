import express from 'express'
import { createApp, deleteAppData, readAndUpdateAppData } from '../controller/app'

const AppDataRoute = express.Router()
AppDataRoute.post('/', createApp)
AppDataRoute.put('/', readAndUpdateAppData)
AppDataRoute.delete('/', deleteAppData)

export default AppDataRoute