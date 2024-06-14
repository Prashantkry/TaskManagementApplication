import express, { Response, Request } from 'express'
import { applicationModel } from '../model/applicationSchema'

interface addAppData {
    email: string,
    title: string,
    oldTitle: string,
    descriptions: string,
    dueDate: string
}
// ! Creating or adding app data to database
export const createApp = async (req: express.Request, res: express.Response): Promise<Response> => {
    // console.log("create app data api triggered")
    const { email, title, descriptions, dueDate }: addAppData = req.body
    if (!title || !descriptions || !dueDate) {
        return res.status(400).json({ message: "Data missing" }).end()
    }
    // console.log(" email", email, "title", title, "descriptions", descriptions, ."dueDate", dueDate)
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

// ! Get all Task from database
export const getAllAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email } = req.headers
    // console.log("email -> ", email)
    const allData = await applicationModel.find({ email: email })
    if (!allData) {
        return res.status(400).json({ message: "No data found" }).end()
    }
    // console.log("allData -> ", allData)
    return res.status(200).json({ allData }).end()
}

// ! Read and Update
export const readAndUpdateAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("Update api triggered")
    const { email, oldTitle, title, descriptions, dueDate }: addAppData = req.body
    // console.log("email", email, "oldTitle", oldTitle, "title", title, "descriptions", descriptions, "dueDate", dueDate)
    const findUser = await applicationModel.find({ email })
    if (!findUser) {
        return res.status(400).json({ message: "User not found" }).end()
    }
    const foundTitle = findUser.find((data) => data.title === oldTitle)
    // console.log("foundTitle -> ", foundTitle)
    if (!foundTitle) {
        return res.status(400).json({ message: "Title not found" }).end()
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
        // console.log("updateQuery -> ", updateQuery)
        await applicationModel.updateOne({ email: email }, updateQuery)
        // console.log("updateData -> ", updateData)
        return res.status(200).json({ message: "App data updated successfully" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in updating data" }).end()
    }
}

// ! Delete
export const deleteAppData = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("delete api triggered")
    let deleteTitle
    const { title } = req.body
    // console.log("title -> ", title)
    if (!title) {
        return res.status(400).json({ message: "Provide Title" }).end()
    }

    const foundTitle = await applicationModel.find({ title })
    if (!foundTitle) {
        return res.status(400).json({ message: "No user found" }).end()
    }
    // console.log("foundTitle -> ", foundTitle)
    foundTitle.map((data) => {
        // console.log(data)
        if (data.title === title) {
            deleteTitle = data.title
            console.log("deleteTitle -> ", deleteTitle)
        }
    })
    try {
        const deletedData = await applicationModel.deleteOne({ title: deleteTitle })
        // console.log(deletedData)
        return res.status(200).json({ message: "Application data successfully deleted" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in deleting data" }).end()
    }
}