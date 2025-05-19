import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../components/css/zoom.css'

const API_BASE_URL = "http://localhost:5000";

function AdminPanel() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Memoize the fetch functions using useCallback to prevent infinite loops
    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            setCategories(response.data);
            
            // Set default selected category for upload if none is selected
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

    // Effect to fetch images and categories always, regardless of token
    useEffect(() => {
        fetchImages();
        fetchCategories();
    }, [fetchImages, fetchCategories]);

    // Effect to fetch filtered images when filter changes
    useEffect(() => {
        fetchImages(filterCategory);
    }, [filterCategory, fetchImages]);

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Validate file size (16MB limit)
        if (selectedFile && selectedFile.size > 16 * 1024 * 1024) {
            setError('File is too large. Maximum size is 16MB.');
            return;
        }

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            setError('Invalid file type. Only PNG, JPEG, GIF, and WebP are allowed.');
            return;
        }

        setFile(selectedFile);
        setError('');
    };

    // Upload image with category
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
            
            // Reset file input
            document.getElementById('file-upload').value = '';
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.response?.data?.message || 'Failed to upload image');
        }
    };

    // Add new category
    const addCategory = async () => {
        if (!newCategoryName.trim()) {
            setError('Category name cannot be empty');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/categories`, 
                { name: newCategoryName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCategories();
            setNewCategoryName('');
            setError('');
        } catch (error) {
            console.error('Error adding category:', error);
            setError(error.response?.data?.message || 'Failed to add category');
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        // Confirm before deleting
        if (!window.confirm('Are you sure you want to delete this category? All associated images must be removed first.')) {
            return;
        }
        
        try {
            await axios.delete(`${API_BASE_URL}/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCategories();
            
            // Reset filter if the deleted category was being used as a filter
            if (filterCategory === id.toString()) {
                setFilterCategory('');
            }
            
            setError('');
        } catch (error) {
            console.error('Error deleting category:', error);
            setError(error.response?.data?.message || 'Failed to delete category');
        }
    };

    // Delete image
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

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Basic input validation
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
            
            // Handle remember me logic
            if (rememberMe) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('rememberMe', 'true');
            } else {
                // Store token for current session only, remove rememberMe flag
                sessionStorage.setItem('token', accessToken);
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('token');
            }
            
            // Clear sensitive information
            setUsername('');
            setPassword('');
            setRememberMe(false);
            setError('');
            
            // Hide login form after successful login
            document.getElementById('login-section').style.display = 'none';
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    // Logout handler
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
    };

    // Get category name by id
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === parseInt(categoryId));
        return category ? category.name : 'Unknown';
    };

    // Determine if user is authenticated admin
    const isAdmin = !!token;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#cbcbcb", padding: "24px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* Header section - changes based on login status */}
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "24px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "16px 24px"
                }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                        {isAdmin ? "Image Gallery Admin" : "Image Gallery"}
                    </h2>
                    {isAdmin ? (
                        <button onClick={handleLogout} style={{
                            backgroundColor: "#ef4444",
                            color: "#ffffff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => document.getElementById('login-section').style.display = 'block'} style={{
                            backgroundColor: "#3b82f6",
                            color: "#ffffff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}>
                            Admin Login
                        </button>
                    )}
                </div>

                {/* Login Section - Hidden by default for non-admins */}
                <div id="login-section" style={{
                    display: "none",
                    maxWidth: "400px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "32px 24px",
                    marginBottom: "24px"
                }}>
                    <h2 style={{ fontSize: "24px", marginBottom: "16px", textAlign: "center" }}>Admin Login</h2>
                    {error && (
                        <div style={{
                            backgroundColor: "#fee2e2",
                            border: "1px solid #f87171",
                            color: "#b91c1c",
                            padding: "12px 16px",
                            borderRadius: "4px",
                            marginBottom: "16px"
                        }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", color: "#4b5563", fontWeight: "bold", marginBottom: "8px" }}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d5db",
                                    outline: "none",
                                    fontSize: "16px"
                                }}
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", color: "#4b5563", fontWeight: "bold", marginBottom: "8px" }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d5db",
                                    outline: "none",
                                    fontSize: "16px"
                                }}
                                placeholder="******************"
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                color: "#4b5563", 
                                cursor: "pointer" 
                            }}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{ marginRight: "8px" }}
                                />
                                Remember me
                            </label>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button type="button" 
                                onClick={() => document.getElementById('login-section').style.display = 'none'}
                                style={{
                                    backgroundColor: "#9ca3af",
                                    color: "#ffffff",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}>
                                Cancel
                            </button>
                            <button type="submit" style={{
                                backgroundColor: "#3b82f6",
                                color: "#ffffff",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}>
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                {/* Category Management - Only visible when logged in as admin */}
                {isAdmin && (
                    <div style={{ 
                        marginBottom: "24px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        padding: "16px 24px"
                    }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Category Management</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                            <input 
                                type="text" 
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="New category name" 
                                style={{
                                    flex: "1",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    border: "1px solid #d1d5db",
                                    outline: "none",
                                    fontSize: "16px"
                                }}
                            />
                            <button 
                                onClick={addCategory} 
                                style={{
                                    backgroundColor: "#10b981",
                                    color: "#ffffff",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Add Category
                            </button>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            {categories.map(category => (
                                <div key={category.id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#f3f4f6",
                                    borderRadius: "20px",
                                    padding: "8px 16px",
                                    gap: "8px"
                                }}>
                                    <span style={{ fontSize: "14px" }}>{category.name}</span>
                                    <button 
                                        onClick={() => deleteCategory(category.id)}
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ef4444",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            padding: "0 4px"
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Admin Controls (Upload) - Only visible when logged in */}
                {isAdmin && (
                    <div style={{ 
                        marginBottom: "24px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        padding: "16px 24px"
                    }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Upload New Image</h3>
                        {error && (
                            <div style={{
                                backgroundColor: "#fee2e2",
                                border: "1px solid #f87171",
                                color: "#b91c1c",
                                padding: "12px 16px",
                                borderRadius: "4px",
                                marginBottom: "16px"
                            }}>
                                {error}
                            </div>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <label style={{ minWidth: "100px", fontWeight: "bold" }}>Category:</label>
                                <select 
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    style={{
                                        flex: "1",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        border: "1px solid #d1d5db",
                                        outline: "none",
                                        fontSize: "16px"
                                    }}
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <label style={{ minWidth: "100px", fontWeight: "bold" }}>Image:</label>
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    onChange={handleFileChange} 
                                    style={{ fontSize: "14px", flex: "1" }}
                                />
                                <button 
                                    onClick={uploadImage} 
                                    disabled={!file || !selectedCategory}
                                    style={{
                                        backgroundColor: "#10b981",
                                        color: "#ffffff",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        opacity: (file && selectedCategory) ? "1" : "0.5"
                                    }}
                                >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Filter - Visible to all users */}
                <div style={{ 
                    marginBottom: "24px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "16px 24px"
                }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Filter Images</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <label style={{ minWidth: "100px", fontWeight: "bold" }}>Category:</label>
                        <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{
                                flex: "1",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                border: "1px solid #d1d5db",
                                outline: "none",
                                fontSize: "16px"
                            }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image Gallery - Visible to all users */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
                    {images.map(image => (
                        <div 
                            key={image.id} 
                            style={{
                                backgroundColor: "#ffffff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                borderRadius: "8px",
                                overflow: "hidden"
                            }}
                        >
                            <img 
                                src={`${API_BASE_URL}/static/uploads/${image.filename}`} 
                                alt={image.filename}
                                className="zoom-image"
                                style={{ width: "100%", height: "200px", objectFit: "cover"}}
                            />
                            <div style={{ padding: "16px" }}>
                                <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {/* {image.filename} */}
                                </p>
                                <p style={{ 
                                    fontSize: "14px", 
                                    color: "#ffffff", 
                                    marginBottom: "12px", 
                                    background: 'linear-gradient(0deg, hsla(43, 42%, 42%, 1) 0%, hsla(43, 49%, 44%, 1) 100%)',
                                    borderRadius: "5px",
                                    padding: "4px 12px",
                                    display: "inline-block"
                                }}>
                                    {image.category_name}
                                </p>
                                {isAdmin && (
                                    <button 
                                        onClick={() => deleteImage(image.id)}
                                        style={{
                                            backgroundColor: "#ef4444",
                                            color: "#ffffff",
                                            padding: "8px 16px",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            width: "100%"
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state message */}
                {images.length === 0 && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "48px", 
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}>
                        <p style={{ fontSize: "18px", color: "#6b7280" }}>
                            {filterCategory ? 
                                `No images found in the "${getCategoryName(filterCategory)}" category` : 
                                'No images to display'}
                        </p>
                        {isAdmin && (
                            <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "8px" }}>
                                Upload your first image using the form above
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;