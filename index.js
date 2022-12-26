//imports
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DbConnection = require('./config/dbconnect')
const express = require("express");
const app = express();

//config
dotenv.config();
const PORT = process.env.PORT;
mongoose.set('strictQuery', false);
DbConnection();

//middleWares
app.use(express.json())

//routes
const userRouter=require("./routes/user");
const bookRouter=require("./routes/book");
    //default route
    app.get("/",(req,res)=>{
        res.sendStatus(200);
    })
    //user route
    app.use("/users",userRouter);
    //books route
    app.use("/books",bookRouter);
    // * for all non specifeid routes
    app.get("*",(_req,res)=>{
        res.status(404).json({
            message: "route not found"
        });
    });

// node event for db
mongoose.connection.on("error",()=>{
    console.error.bind("Connnection Error");
})

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log("Server started at port " + PORT);
    })
})