import express from "express";
import addAPPDataRoute from './addAppData'
const versionRoutes = express.Router()

versionRoutes.use("/addAppData", addAPPDataRoute)

export default versionRoutes