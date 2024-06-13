import express from "express"
import { readAndUpdateAppData } from "../controller/app"

const updateAppDataRoutes = express.Router()
updateAppDataRoutes.post('/', readAndUpdateAppData)
export default updateAppDataRoutes