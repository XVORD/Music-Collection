import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MusicList.css';

const MusicList = () => {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/music')
            .then(response => setMusic(response.data))
            .catch(error => console.error('Error fetching music:', error));
    }, []);

    const deleteMusic = (id) => {
        axios.delete(`http://localhost:3000/api/music/${id}`)
            .then(() => setMusic(music.filter(m => m.id !== id)))
            .catch(error => console.error('Error deleting music:', error));
    };

    return (
        <div className="music-container">
            <Link to="/add" className="button">Add New Music</Link>
            <h2>Music List</h2>
            <ul>
                {music.map(m => (
                    <li key={m.id}>
                        <div>
                            <p>{m.title} by {m.artist} release {m.year}</p>
                            <button className="button-delete" onClick={() => deleteMusic(m.id)}>Delete</button>
                            <Link className="button-edit" to={`/edit/${m.id}`}>Edit</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MusicList;
