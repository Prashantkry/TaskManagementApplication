import express, { Response, Request } from 'express'
import { applicationModel } from '../model/applicationSchema'

interface addAppData {
    email: string,
    title: string,
    descriptions: string,
    dueDate: string
}
// ! Creating or adding app data to database
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

// ! updating
export const readAndUpdateAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, title, descriptions, dueDate } = req.body
    const findUser = await applicationModel.findOne({ email })
    if (!findUser) {
        return res.status(400).json({ message: "User not found" }).end()
    }
    // updating data to database 
    const updateQuery = {
        $set: {
            title: title,
            descriptions: descriptions,
            dueDate: dueDate
        }
    }
    const updatedData = await applicationModel.updateOne({ email }, updateQuery)
    return res.status(200).json({ message: "App data updated successfully" }).end()
}

// ! Deleting 