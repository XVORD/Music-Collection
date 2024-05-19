import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMusic.css';

const EditMusic = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/music/${id}`)
            .then(response => {
                const { title, artist, album, year } = response.data;
                setTitle(title);
                setArtist(artist);
                setAlbum(album);
                setYear(year);
            })
            .catch(error => console.error('Error fetching music:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/music/${id}`, { title, artist, album, year })
            .then(() => navigate('/'))
            .catch(error => console.error('Error updating music:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Edit Music</h2>
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
            <button type="submit">Update Music</button>
        </form>
    );
};

export default EditMusic;
