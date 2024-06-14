import express from "express";
import AppDataRoute from "./AppDataRoutes";
import UserRoute from "./UserRoutes";
import loginRoutes from "./login";

const versionRoutes = express.Router()

versionRoutes.use("/appData", AppDataRoute)
versionRoutes.use("/user", UserRoute)
versionRoutes.use("/login", loginRoutes)

export default versionRoutes