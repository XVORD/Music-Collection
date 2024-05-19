import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMusic.css'; // Import file CSS

const AddMusic = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/music', { title, artist, album, year }) 
            .then(() => navigate('/'))
            .catch(error => console.error('Error adding music:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Add New Music</h2>
            <div className="form-group">
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Artist:</label>
                <input type="text" value={artist} onChange={e => setArtist(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Album:</label>
                <input type="text" value={album} onChange={e => setAlbum(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Year:</label>
                <input type="number" value={year} onChange={e => setYear(e.target.value)} />
            </div>
            <button type="submit">Add Music</button>
        </form>
    );
};

export default AddMusic;
