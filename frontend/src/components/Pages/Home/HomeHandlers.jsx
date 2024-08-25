import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

export const fetchBooks = async (UserId) => {
    try {
        const response = await axios.get(`${API_URL}/getbooks`, { params: { UserId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const addBook = async (bookData) => {
    try {
        await axios.post(`${API_URL}/books`, bookData);
        // Fetch books after adding
        return await fetchBooks(bookData.UserId);
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (bookData) => {
    try {
        await axios.put(`${API_URL}/updateBook`, bookData);
        // Fetch books after updating
        return await fetchBooks(bookData.UserId);
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};
