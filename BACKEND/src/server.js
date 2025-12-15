import cors from "cors"
import dotenv from "dotenv"

import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//to access the content from the .env file
dotenv.config()

//to create an express app
const app=express();
const Port=process.env.PORT// to get the value PORT from .env file

app.use(cors({origin:"http://localhost:5173"}))//to resolve the corse error .this happens when a service get data from anothe rservice like frontend gettingdata from backend
 
app.use(express.json()); // this middleware parse the json bodies(to get the data from the req.body)

app.use(rateLimiter)



// app.use((req,res,next)=>{
//     console.log(`req method is ${req.method} & req Url is ${req.url}`);//custom middleware
//     next();
// })

app.use("/api/notes",noteRoutes);//this is the prefix for the routes

connectDB().then(()=>{
    app.listen(Port,()=>{
    console.log("Server is listening to port ", Port);
});
})




