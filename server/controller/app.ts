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
    try {
        const newAppData = new applicationModel({
            email,
            title,
            descriptions,
            dueDate
        })
        newAppData.save()
        return res.status(200).json({ message: "Application data added successfully" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in application  is not added to database" }).end()
    }
}

// ! Read and Update
export const readAndUpdateAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, title, descriptions, dueDate }: addAppData = req.body
    const findUser = await applicationModel.findOne({ email })
    if (!findUser) {
        return res.status(400).json({ message: "User not found" }).end()
    }
    // updating data to database 
    try {
        const updateQuery = {
            $set: {
                title: title,
                descriptions: descriptions,
                dueDate: dueDate
            }
        }
        await applicationModel.updateOne({ email }, updateQuery)
        return res.status(200).json({ message: "App data updated successfully" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in updating data" }).end()
    }
}

// ! Delete
export const deleteAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email } = req.body
    if (!email) {
        res.status(400).json({ message: "Provide email" }).end()
    }

    const foundEmail = await applicationModel.findOne({ email })
    if (!foundEmail) {
        res.status(400).json({ message: "No user found" }).end()
    }
    try {
        await applicationModel.deleteOne({ email })
        res.status(200).json({ message: "Application data successfully deleted" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong application data not deleted" }).end()
    }
}