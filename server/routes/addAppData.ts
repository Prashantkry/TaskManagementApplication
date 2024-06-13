import express from 'express'
import { createApp } from '../controller/app'

const addAPPDataRoute = express.Router()
addAPPDataRoute.post('/', createApp)
export default  addAPPDataRoute