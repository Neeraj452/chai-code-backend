// require('dotenv').config({path: './env'})
import dotenv from "dotenv" // we are importing dotenv package here to load environment variables from .env file
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({ // we are calling config method of dotenv package to load environment variables from .env file, and we are passing the path of .env file to it, the path is relative to the root directory of the project, so we are using ./ to indicate that the .env file is in the root directory of the project.
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/