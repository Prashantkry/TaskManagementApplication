import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
}, {
    collection: "userData"
})

export const userModel = mongoose.model("userSchema", userSchema)