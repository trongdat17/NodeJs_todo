import express from "express";
import router from "./routers/todo.js";
import ConnectDB from "./mongoose_db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

ConnectDB();
app.use('/todos', router);

app.listen(process.env.PORT, ()=>{
    console.log(`The Server is running on port: ${process.env.PORT}`)
})
