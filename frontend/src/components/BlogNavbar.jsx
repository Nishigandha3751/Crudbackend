import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './BlogNavbar.css';

const BlogNavbar = ({ onAddBlog }) => {
    return (
        <Navbar expand="lg" className="navbar">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="#home">Blog App</Navbar.Brand>
                <Button
                    className="add-blog-button"
                    onClick={onAddBlog}
                >
                    Add Blog
                </Button>
            </Container>
            <ToastContainer />
        </Navbar>
    );
};

export default BlogNavbar;
