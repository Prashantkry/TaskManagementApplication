import express, { Response } from 'express'
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
    const userExist = await userModel.findOne({ email })
    if (userExist) {
        return res.status(400).json({ message: "UserAlready" }).end()
    }
    // adding user to database if new user
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
