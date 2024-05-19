import React from 'react';
import './About.css'; // Import file CSS

function About() {
    return (
        <div className="about-container"> {/* Gunakan kelas CSS */}
            <h2 className="about-heading">About Us</h2>
            <p className="about-paragraph">Music Collection adalah sebuah platform yang memungkinkan pengguna untuk mengelola koleksi musik mereka secara efisien.
            Dengan menggunakan React.js sebagai frontend dan Express.js sebagai backend, pengguna dapat menambahkan, mengedit, dan menghapus entri musik sesuai keinginan mereka. Aplikasi ini memberikan kemudahan dalam mengatur dan menjelajahi koleksi musik, membuat pengalaman mendengarkan musik menjadi lebih teratur dan terorganisir.</p>
        </div>
    );
}

export default About;
