import express from 'express';
import mongoose from 'mongoose';
import { Book } from "./models/Book.models.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the page");
});

// Route to add book in database

app.post('/books', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const newBook = {
            title,
            author,
            publishYear
        };
        const book = await Book.create(newBook);
        res.status(201).send({ message: "Book created successfully", book });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Route to show all book in database

app.get('/books', async (req,res)=>{
    try {
        const books= await Book.find({})
        return res.status(200).json({
            count:books.length,
            data:books
        })
    } catch (error) {
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
})

// Route to show book by its id

app.get('/books/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        return res.status(400).json({
            status:400,
            message:"book not found "+error.message
        })
    }
})

// Route to update book

app.put('/books/:id', async(req,res)=>{
    try {
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"send all required fields: title,author,publishYear"
            })
        }
        const {id}=req.params
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(400).json({
                message:"book not found"
            })
        }
        return res.status(200).send({
            message:"Book updated successfully"
        })
    } catch (error) {
        return res.status(400).json({
            status:400,
            message:"book not found "+error.message
        })
    }
})

await mongoose.connect("mongodb+srv://saurabh:saurabh123@cluster0.5vej35r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () => {
            console.log(`Server started on port 5000`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
