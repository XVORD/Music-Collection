const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://beressiagian:Samber321@sbdpraktikum.flyb2zc.mongodb.net/?retryWrites=true&w=majority&appName=SBDPraktikum';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for your music collection
const musicSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    year: Number,
});

// Create a model based on the schema
const Music = mongoose.model('Music', musicSchema);

// CRUD Routes
app.post('/api/music', async (req, res) => {
    const { title, artist, album, year } = req.body;
    try {
        const newMusic = new Music({ title, artist, album, year });
        const savedMusic = await newMusic.save();
        res.json(savedMusic);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/api/music', async (req, res) => {
    try {
        const allMusic = await Music.find();
        res.json(allMusic);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/api/music/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Music.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/api/music/:id', async (req, res) => {
    const { id } = req.params;
    const { title, artist, album, year } = req.body;
    try {
        const updatedMusic = await Music.findByIdAndUpdate(id, { title, artist, album, year }, { new: true });
        res.json(updatedMusic);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
