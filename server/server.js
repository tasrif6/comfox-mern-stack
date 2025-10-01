import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middlewares - CORS should be configured ONCE and FIRST
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "https://your-frontend-domain.com"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(morgan('dev'))

// Root route for health check
app.get('/', (req,res) => {
    res.send({
        message: "API is working",
        activeStatus: true,
        error: false,
    })
})

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Port configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.bgCyan.white);
});

export default app;
