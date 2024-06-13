import { logger } from './logger';
import * as dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 9000
const clientEndURl = process.env.clientUrl

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: clientEndURl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const server = http.createServer(app)
server.listen(PORT, () => {
    logger.info(`Server is listening on ${PORT}`)
})

app.get('/',)