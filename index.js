const express = require('express')
const User = require('./models/user.model')
const app = express()
const port = 3001
const mongoose = require('mongoose');
app.use(express.json())
const cors = require('cors');
console.log('check')
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})
app.post('/api/user', async (req, res) => {
    try {
        let user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.put('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})




app.delete('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.get('/api/users', async (req, res) => {
    try {
        let user = await User.find({})
        console.log("check user list", user)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

mongoose.connect('mongodb+srv://sidramlik9090:wEINf1A87TKkAvBo@backenddb.hsymddj.mongodb.net/BackendDb?retryWrites=true&w=majority&appName=BackendDb')
    .then(() => {
        console.log('Connected to database')
    }).catch((error) => {
        console.log("connection failed", error)
    }
    )