import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Grid, Card, CardMedia, Typography, Button, TextField, Select, MenuItem,
    FormControl, InputLabel, Paper, Alert, Checkbox, FormControlLabel,
    AppBar, Toolbar, Container, Chip, Pagination, Dialog, DialogContent,
    IconButton, Fade
} from '@mui/material';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


function Gallery() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    
    // Lightbox states
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(12);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            const data = await response.json();
            setCategories(data);
            if (!selectedCategory && data.length > 0) {
                setSelectedCategory(data[0].id.toString());
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
            const response = await fetch(url);
            const data = await response.json();
            setImages(data);
            setError('');
            setCurrentPage(1); // Reset to first page when filtering
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
            await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            fetchImages(filterCategory);
            setFile(null);
            setError('');
            document.getElementById('file-upload').value = '';
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to upload image');
        }
    };

    const deleteImage = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/delete/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchImages(filterCategory);
            setError('');
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete image');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            const accessToken = data.access_token;
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
            setError('Login failed');
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

    // Lightbox functions
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentPageImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentPageImages.length) % currentPageImages.length);
    };

    // Pagination calculations
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentPageImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(images.length / imagesPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const isAdmin = !!token;

    return (
        <Box sx={{ pt: 20, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <AppBar position="static" sx={{ 
                backgroundColor: "#ffffff", 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ 
                        color: "#333", 
                        fontWeight: "700",
                        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {isAdmin ? "Image Gallery Admin" : "Galerija Uskoro"}
                    </Typography>
                    {isAdmin ? (
                        <Button 
                            variant="contained" 
                            onClick={handleLogout}
                            sx={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
                                }
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button 
                            variant="contained" 
                            onClick={() => setShowLogin(true)}
                            sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #764ba2, #667eea)',
                                }
                            }}
                        >
                            Admin Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {showLogin && !isAdmin && (
                    <Paper elevation={8} sx={{ 
                        p: 4, 
                        mb: 3, 
                        maxWidth: 400, 
                        mx: "auto",
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                    }}>
                        <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: 'bold' }}>
                            Admin Login
                        </Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField 
                                fullWidth 
                                label="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                sx={{ 
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        borderRadius: 2
                                    }
                                }} 
                                required 
                            />
                            <TextField 
                                fullWidth 
                                type="password" 
                                label="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                sx={{ 
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        borderRadius: 2
                                    }
                                }} 
                                required 
                            />
                            <FormControlLabel
                                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: 'white' }} />}
                                label="Remember me"
                                sx={{ mb: 2, color: 'white' }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => setShowLogin(false)}
                                    sx={{ 
                                        borderColor: 'white', 
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#667eea',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.9)'
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                )}

                {isAdmin && (
                    <Paper elevation={4} sx={{ 
                        p: 3, 
                        mb: 3, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                        color: 'white'
                    }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Upload New Image</Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: 'white' }}>Category</InputLabel>
                                    <Select 
                                        value={selectedCategory} 
                                        onChange={(e) => setSelectedCategory(e.target.value)} 
                                        label="Category"
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            borderRadius: 2
                                        }}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    style={{ 
                                        width: "100%", 
                                        padding: '10px',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        borderRadius: '8px',
                                        border: 'none'
                                    }} 
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button 
                                    variant="contained" 
                                    onClick={uploadImage} 
                                    disabled={!file || !selectedCategory} 
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#00b894',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#00a085'
                                        }
                                    }}
                                >
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                {/* Category Filter - Horizontal List */}
                <Paper elevation={4} sx={{ 
                    p: 3, 
                    mb: 3, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 1.5,
                        alignItems: 'center'
                    }}>
                        <Chip
                            label="All Categories"
                            onClick={() => setFilterCategory('')}
                            variant={filterCategory === '' ? 'filled' : 'outlined'}
                            sx={{
                                backgroundColor: filterCategory === '' ? 'white' : 'rgba(255,255,255,0.2)',
                                color: filterCategory === '' ? '#6c5ce7' : 'white',
                                fontWeight: 'bold',
                                border: '2px solid rgba(255,255,255,0.3)',
                                '&:hover': {
                                    backgroundColor: filterCategory === '' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        />
                        {categories.map(category => (
                            <Chip
                                key={category.id}
                                label={category.name}
                                onClick={() => setFilterCategory(category.id.toString())}
                                variant={filterCategory === category.id.toString() ? 'filled' : 'outlined'}
                                sx={{
                                    backgroundColor: filterCategory === category.id.toString() ? 'white' : 'rgba(255,255,255,0.2)',
                                    color: filterCategory === category.id.toString() ? '#6c5ce7' : 'white',
                                    fontWeight: 'bold',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        backgroundColor: filterCategory === category.id.toString() ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </Box>
                </Paper>

                {/* Images Grid */}
                <Grid container spacing={3}>
                    {currentPageImages.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                            <Card sx={{ 
                                position: "relative", 
                                height: "100%",
                                borderRadius: 3,
                                overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
                                }
                            }}>
                                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${API_BASE_URL}/static/uploads/${image.filename}`}
                                        alt={image.filename}
                                        sx={{ 
                                            objectFit: "cover",
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => openLightbox(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.8)'
                                            }
                                        }}
                                    >
                                        <ZoomIn size={20} />
                                    </IconButton>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            color: "white",
                                            p: 1,
                                            borderRadius: 2,
                                            display: "inline-block",
                                            mb: isAdmin ? 2 : 0,
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {image.category_name}
                                    </Typography>
                                    {isAdmin && (
                                        <Button 
                                            variant="contained" 
                                            onClick={() => deleteImage(image.id)} 
                                            fullWidth 
                                            sx={{ 
                                                mt: 1,
                                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontWeight: 'bold',
                                    '&.Mui-selected': {
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    }
                                }
                            }}
                        />
                    </Box>
                )}

                {/* No Images Message */}
                {images.length === 0 && (
                    <Paper elevation={4} sx={{ 
                        p: 6, 
                        textAlign: "center", 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
                        color: 'white'
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {filterCategory ?
                                `No images found in the "${getCategoryName(filterCategory)}" category` :
                                'No images to display'}
                        </Typography>
                        {isAdmin && (
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                                Upload your first image using the form above
                            </Typography>
                        )}
                    </Paper>
                )}
            </Container>

            {/* Lightbox */}
            <Dialog
                open={lightboxOpen}
                onClose={closeLightbox}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        boxShadow: 'none',
                        borderRadius: 2
                    }
                }}
            >
                <DialogContent sx={{ p: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                    <IconButton
                        onClick={closeLightbox}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            zIndex: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)'
                            }
                        }}
                    >
                        <X size={24} />
                    </IconButton>
                    
                    {currentPageImages.length > 1 && (
                        <>
                            <IconButton
                                onClick={prevImage}
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    zIndex: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                <ChevronLeft size={24} />
                            </IconButton>
                            
                            <IconButton
                                onClick={nextImage}
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    zIndex: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                <ChevronRight size={24} />
                            </IconButton>
                        </>
                    )}
                    
                    {currentPageImages[currentImageIndex] && (
                        <Fade in={lightboxOpen} timeout={300}>
                            <img
                                src={`${API_BASE_URL}/static/uploads/${currentPageImages[currentImageIndex].filename}`}
                                alt={currentPageImages[currentImageIndex].filename}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '80vh',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </Fade>
                    )}
                    
                    {currentPageImages[currentImageIndex] && (
                        <Box sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Typography variant="body2">
                                {currentPageImages[currentImageIndex].category_name}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {currentImageIndex + 1} of {currentPageImages.length}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default Gallery;