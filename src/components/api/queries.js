import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

// Function to fetch images filtered by category
export const fetchFilteredImages = async (categoryId = '') => {
    try {
        let url = `${API_BASE_URL}/images`;
        if (categoryId) {
            url += `?category_id=${categoryId}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

// Function to fetch all categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
