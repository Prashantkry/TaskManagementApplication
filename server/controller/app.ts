import express, { Response, Request } from 'express'
import { applicationModel } from '../model/applicationSchema'

interface addAppData {
    email: string,
    title: string,
    descriptions: string,
    dueDate: string
}
export const createApp = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, title, descriptions, dueDate }: addAppData = req.body
    if (!title || !descriptions || !dueDate) {
        return res.status(400).json({ message: "Data missing" }).end()
    }
    // adding data to database 
    const newAppData = new applicationModel({
        email,
        title,
        descriptions,
        dueDate
    })
    newAppData.save()
    return res.status(200).json({ message: "Application data added successfully" }).end()
}

// find or read data

// updating

// deleting 
