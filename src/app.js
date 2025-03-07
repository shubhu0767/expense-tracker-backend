import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'
import expenseRouter from "./routes/expense.routes.js";
import { errorHandler } from './utilis/errorHandler.js';

// routes decleration
app.use('/users', userRouter);
// url be like 'http://localhost:8080/users/register
app.use('/expense', expenseRouter);

app.use(errorHandler);
export {app};