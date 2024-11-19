import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './BlogApp.css'; 


const BlogApp = ({ showAddBlog, onCloseAddBlog }) => {
    const [blogs, setBlogs] = useState([]);
    const [show, setShow] = useState(showAddBlog);
    const [currentBlog, setCurrentBlog] = useState({ title: '', para: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [selectedBlog, setSelectedBlog] = useState(null);

    const apiUrl = 'http://localhost:4000';

    useEffect(() => {
        setShow(showAddBlog);
    }, [showAddBlog]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/`);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleShow = (blog = { title: '', para: '' }, edit = false) => {
        setCurrentBlog(blog);
        setIsEdit(edit);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        onCloseAddBlog();
    };

    const handleSave = async () => {
        try {
            if (isEdit) {
                await axios.put(`${apiUrl}/update/${currentBlog._id}`, currentBlog);
                toast.success("Blog updated successfully!");
            } else {
                await axios.post(`${apiUrl}/add`, currentBlog);
                toast.success("Blog added successfully!");
            }
            fetchBlogs();
            handleClose();
        } catch (error) {
            toast.error("Error saving blog.");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/delete/${id}`);
            toast.success("Blog deleted successfully!");
            fetchBlogs();
        } catch (error) {
            toast.error("Error deleting blog.");
            console.error(error);
        }
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    const handleBackClick = () => {
        setSelectedBlog(null);
    };

    return (
        <div className="container">
            <ToastContainer />
            <h1 className="mt-4">Blog App</h1>

            {selectedBlog ? (
                <div className="blog-detail">
                    <Button variant="secondary" onClick={handleBackClick} className="mb-3">
                        Back to List
                    </Button>
                    <h2>{selectedBlog.title}</h2>
                    <p>{selectedBlog.para}</p>
                    <div className="button-group">
                        <Button
                            variant="warning"
                            onClick={() => handleShow(selectedBlog, true)}
                        >
                            <PencilSquare /> Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(selectedBlog._id)}
                        >
                            <Trash /> Delete
                        </Button>
                    </div>
                </div>
            ) : (
                <Row className="mt-4">
                    {blogs.map((blog) => (
                        <Col key={blog._id} xs={12} md={6} lg={4} className="mb-4">
                            <div className="card" onClick={() => handleBlogClick(blog)}>
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">
                                        {expanded[blog._id]
                                            ? blog.para
                                            : blog.para.substring(0, 100) + '...'}
                                    </p>
                                    <Button
                                        variant="link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(blog._id);
                                        }}
                                    >
                                        {expanded[blog._id] ? 'Read Less' : 'Read More'}
                                    </Button>
                                    <div className="button-group">
                                        <Button
                                            variant="warning"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShow(blog, true);
                                            }}
                                        >
                                            <PencilSquare /> Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(blog._id);
                                            }}
                                        >
                                            <Trash /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit Blog' : 'Add Blog'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentBlog.title}
                                onChange={(e) =>
                                    setCurrentBlog({ ...currentBlog, title: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={currentBlog.para}
                                onChange={(e) =>
                                    setCurrentBlog({ ...currentBlog, para: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {isEdit ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BlogApp;
