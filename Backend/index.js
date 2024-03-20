import express from 'express';
import mongoose from 'mongoose';
import Route from './Routes/Book.Routes.js';
import 'dotenv/config'
import cors from 'cors' 
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the page");
});
app.use(cors)
app.use('/books',Route)

await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
