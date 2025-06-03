import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Grid, Card, CardMedia, Typography, Button, TextField, Select, MenuItem,
    FormControl, InputLabel, Paper, Alert, Checkbox, FormControlLabel,
    AppBar, Toolbar, Container
} from '@mui/material';
import axios from 'axios';
import '../components/css/zoom.css';
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000";

function Gallery() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || '';

    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState(initialCategory);
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            setCategories(response.data);
            if (!selectedCategory && response.data.length > 0) {
                setSelectedCategory(response.data[0].id.toString());
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories');
        }
    }, [selectedCategory]);

    const fetchImages = useCallback(async (categoryId = '') => {
        try {
            let url = `${API_BASE_URL}/images`;
            if (categoryId) {
                url += `?category_id=${categoryId}`;
            }
            const response = await axios.get(url);
            setImages(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Failed to fetch images');
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchImages(filterCategory);
    }, [filterCategory, fetchImages]);

    useEffect(() => {
        navigate(`/galerija?category=${filterCategory}`);
    }, [filterCategory, navigate]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 16 * 1024 * 1024) {
            setError('File is too large. Maximum size is 16MB.');
            return;
        }

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            setError('Invalid file type. Only PNG, JPEG, GIF, and WebP are allowed.');
            return;
        }

        setFile(selectedFile);
        setError('');
    };

    const uploadImage = async () => {
        if (!file) {
            setError('Please select a file.');
            return;
        }
        if (!selectedCategory) {
            setError('Please select a category.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category_id', selectedCategory);

        try {
            await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchImages(filterCategory);
            setFile(null);
            setError('');
            document.getElementById('file-upload').value = '';
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.response?.data?.message || 'Failed to upload image');
        }
    };

    const deleteImage = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchImages(filterCategory);
            setError('');
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.response?.data?.message || 'Failed to delete image');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            });

            const accessToken = response.data.access_token;
            setToken(accessToken);

            if (rememberMe) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('token', accessToken);
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('token');
            }

            setUsername('');
            setPassword('');
            setRememberMe(false);
            setError('');
            setShowLogin(false);
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id.toString() === categoryId.toString());
        return category ? category.name : 'Unknown';
    };

    const isAdmin = !!token;

    return (
        <Box sx={{ pt: 20, minHeight: "100vh", backgroundColor: "#cbcbcb" }}>
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ color: "#000", fontWeight: "bold" }}>
                        {isAdmin ? "Image Gallery Admin" : "Galerija Uskoro"}
                    </Typography>
                    {isAdmin ? (
                        <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={() => setShowLogin(true)}>Admin Login</Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {showLogin && !isAdmin && (
                    <Paper elevation={3} sx={{ p: 4, mb: 3, maxWidth: 400, mx: "auto" }}>
                        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                            Admin Login
                        </Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} required />
                            <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} required />
                            <FormControlLabel
                                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                                label="Remember me"
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button variant="outlined" onClick={() => setShowLogin(false)}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Sign In</Button>
                            </Box>
                        </Box>
                    </Paper>
                )}

                {isAdmin && (
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Upload New Image</Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Category">
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <input id="file-upload" type="file" onChange={handleFileChange} style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button variant="contained" color="success" onClick={uploadImage} disabled={!file || !selectedCategory} fullWidth>Upload</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Filter Images</Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} label="Category">
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>

                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <Card sx={{ position: "relative", height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${API_BASE_URL}/static/uploads/${image.filename}`}
                                    alt={image.filename}
                                    className="zoom-image"
                                    sx={{ objectFit: "cover" }}
                                />
                                <Box sx={{ p: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            background: 'linear-gradient(0deg, hsla(43, 42%, 42%, 1) 0%, hsla(43, 49%, 44%, 1) 100%)',
                                            color: "white",
                                            p: 1,
                                            borderRadius: 1,
                                            display: "inline-block",
                                            mb: isAdmin ? 2 : 0
                                        }}
                                    >
                                        {image.category_name}
                                    </Typography>
                                    {isAdmin && (
                                        <Button variant="contained" color="error" onClick={() => deleteImage(image.id)} fullWidth sx={{ mt: 1 }}>
                                            Delete
                                        </Button>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {images.length === 0 && (
                    <Paper elevation={3} sx={{ p: 6, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            {filterCategory ?
                                `No images found in the "${getCategoryName(filterCategory)}" category` :
                                'No images to display'}
                        </Typography>
                        {isAdmin && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Upload your first image using the form above
                            </Typography>
                        )}
                    </Paper>
                )}
            </Container>
        </Box>
    );
}

export default Gallery;
