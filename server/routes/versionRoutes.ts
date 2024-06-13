import express from "express";
import AppDataRoute from "./AppDataRoutes";
import UserRoute from "./UserRoutes";

const versionRoutes = express.Router()

versionRoutes.use("/appData", AppDataRoute)
versionRoutes.use("/user", UserRoute)

export default versionRoutes