// !winston
import * as winston from 'winston'

export const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: winston.format.json({
        space: 4
    })
})

if (process.env.NODE_ENV != "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

