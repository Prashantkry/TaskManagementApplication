import express, { Response, Request } from 'express'
import { userModel } from '../model/userSchema'

interface addUser {
    email: string,
    name: string,
    password: string,
}
// ! Creating or adding user data to database
export const createUser = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, name, password }: addUser = req.body
    if (!email || !name || !password) {
        return res.status(400).json({ message: "Data missing" }).end()
    }
    // adding data to database 
    try {
        const newUser = new userModel({
            email,
            name,
            password,
        })
        newUser.save()
        return res.status(200).json({ message: "User data added successfully" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in user is not added to database" }).end()
    }
}

// ! Read and Update
export const readAndUpdateUser = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, name, password }: addUser = req.body
    const findUser = await userModel.findOne({ email })
    if (!findUser) {
        return res.status(400).json({ message: "User not found" }).end()
    }
    // updating data to database 
    try {
        const updateQuery = {
            $set: {
                name: name,
                email: email,
                password: password
            }
        }
        await userModel.updateOne({ email }, updateQuery)
        return res.status(200).json({ message: "User data updated successfully" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong in updating user data" }).end()
    }
}

// ! Delete
export const deleteUser = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email } = req.body
    if (!email) {
        res.status(400).json({ message: "Provide email" }).end()
    }

    const foundEmail = await userModel.findOne({ email })
    if (!foundEmail) {
        res.status(400).json({ message: "No user found" }).end()
    }
    try {
        await userModel.deleteOne({ email })
        res.status(200).json({ message: "User data successfully deleted" }).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong user not deleted" }).end()
    }
}