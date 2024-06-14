import express, { Response } from 'express'
import { userModel } from '../model/userSchema'
export const loginController = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Data missing" }).end()
    }
    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            const pass = userExist.password
            if (password === pass) {
                return res.status(200).json({ message: "User signed in", email }).end()
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Sign in failed" }).end()
    }

}