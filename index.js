import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import todoRouter from "./routers/todo.js";
import ConnectDB from "./mongoose_db.js";
import dotenv from "dotenv";
import userRouter from "./routers/auth.js";
import protect from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

ConnectDB();
app.use('/auth', userRouter);
app.use('/todos', protect, todoRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT, ()=>{
    console.log(`The Server is running on port: ${process.env.PORT}`)
})
