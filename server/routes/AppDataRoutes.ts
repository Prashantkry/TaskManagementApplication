import express from 'express'
import { createApp, deleteAppData, getAllAppData, readAndUpdateAppData } from '../controller/app'

const AppDataRoute = express.Router()
AppDataRoute.post('/', createApp)
AppDataRoute.get('/', getAllAppData)
AppDataRoute.put('/', readAndUpdateAppData)
AppDataRoute.delete('/', deleteAppData)

export default AppDataRoute