import express from "express";
import addAPPDataRoute from './addAppData'
import updateAppDataRoutes from "./updateAPPData";
const versionRoutes = express.Router()

versionRoutes.use("/addAppData", addAPPDataRoute)
versionRoutes.use("/updateAppData",updateAppDataRoutes)

export default versionRoutes