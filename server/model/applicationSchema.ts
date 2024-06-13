import mongoose from 'mongoose'

const appSchema = new mongoose.Schema({
    email: String,
    title: String,
    descriptions: String,
    dueDate: String
}, {
    collection: "applicationData"
})

export const applicationModel = mongoose.model("appSchema", appSchema)