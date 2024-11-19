import React, { useState } from 'react';
import BlogApp from './components/BlogApp';
import BlogNavbar from './components/BlogNavbar';
import './App.css'

function App() {
    const [showAddBlog, setShowAddBlog] = useState(false);

    const handleShowAddBlog = () => {
        setShowAddBlog(true); // Show the add blog modal
    };

    const handleCloseAddBlog = () => {
        setShowAddBlog(false); // Hide the add blog modal
    };

    return (
        <div className="app-container">
            <BlogNavbar onAddBlog={handleShowAddBlog} /> {/* Add the Navbar */}
            <div className="content-wrapper">
                <BlogApp showAddBlog={showAddBlog} onCloseAddBlog={handleCloseAddBlog} />
            </div>
        </div>
    );
}

export default App;