const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'beres_bakti',
    host: 'ep-royal-glitter-a1npomkv.ap-southeast-1.aws.neon.tech',
    database: 'Tutam9',
    password: 'UoC2sMmnHXa0',
    port: 5432,
    ssl: {
        rejectUnauthorized: false 
    }
});

// CRUD Routes
app.post('/api/music', async (req, res) => {
    const { title, artist, album, year } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO music (title, artist, album, year) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, artist, album, year]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/api/music', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM music');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/api/music/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM music WHERE id = $1', [id]);
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
        const result = await pool.query(
            'UPDATE music SET title = $1, artist = $2, album = $3, year = $4 WHERE id = $5 RETURNING *',
            [title, artist, album, year, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        // Menguji koneksi ke database saat server mulai
        await pool.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server is running on port ${PORT}`);
});
