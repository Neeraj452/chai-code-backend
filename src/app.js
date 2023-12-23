import express from "express" // we are importing express package here to create express app, and to use express middleware functions, and to use express router, and to use express response methods, and to use express request methods, and to use express next function.
import cors from "cors" // we are importing cors package here to enable cors in our express app, so that our frontend can make requests to our backend., and we are also passing cors options to cors method., and we are also passing cors options to cors method.
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({  // why use this line of code? // we are using cors middleware here to enable cors in our express app, so that our frontend can make requests to our backend., and we are also passing cors options to cors method., and we are also passing cors options to cors method.
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // we are using express.json middleware here to parse json data from the request body, and we are also passing json options to express.json method, and we are also passing json options to express.json method.
app.use(express.urlencoded({extended: true, limit: "16kb"})) // why use this line of code? // we are using express.urlencoded middleware here to parse urlencoded data from the request body, and we are also passing urlencoded options to express.urlencoded method, and we are also passing urlencoded options to express.urlencoded method.
app.use(express.static("public")) // why use this line of code? // we are using express.static middleware here to serve static files from the public folder, and we are also passing public folder path to express.static method, and we are also passing public folder path to express.static method.
app.use(cookieParser()) // why use this line of code? // we are using cookieParser middleware here to parse cookies from the request header, and we are also passing cookieParser options to cookieParser method.


//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }