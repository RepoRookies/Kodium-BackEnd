import express , {Application, Request, Response, NextFunction} from "express"
import "dotenv/config"

const app : express.Application =  express()
const PORT = process.env.PORT || 3000

app.get( "/", ( req : Request , res : Response ) => {
    res.send("Hi")
});       

app.listen(PORT,( ) => console.log(`Server Running on ${PORT}`))