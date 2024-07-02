import { logger } from './logger';
import * as dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import versionRoutes from './routes/versionRoutes'
import mongoose from 'mongoose';

dotenv.config()

const PORT = process.env.PORT || 9000
const clientEndURl = process.env.clientUrl
const mongoUrl = process.env.MONGO_URL

const app = express()


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: clientEndURl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/api/v1/', versionRoutes)

// mongo db connections
mongoose.connect(mongoUrl)
mongoose.connection.on("error", (err) => {
    logger.error(`MongoDb connection error: ${err}`)
})
const server = http.createServer(app)
server.listen(PORT, () => {
    logger.info(`Server is listening on ${PORT}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h1>🎉 Backend Server is active 🎊🥂</h1>`)
})