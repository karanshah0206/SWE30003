const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Initiate MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/ayhf_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then((response) => {
    app.listen(PORT, () => {
        console.log(`Connected to MongoDB and server started on PORT ${PORT}`);
    });
})
.catch((err) => {
    console.error(err);
    process.exit(1); // Stops the process if unable to connect to MongoDB
});


const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: String,
    description: String,
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res, next) => {
    const todos = await Todo.find();
    return res.json(todos);
});

app.post('/api/todos', async (req, res, next) => {
    const todo = new Todo(req.body);
    // save todo to database
    await todo.save();
    return res.json(todo);
});

// Delete a todo
app.delete('/api/todos', async (req, res, next) => {
    // find todo by id and delete
    await Todo.findByIdAndDelete(req.body.id);                   

    return res.json({
        message: 'Todo deleted successfully',
        success: true,
    });
});