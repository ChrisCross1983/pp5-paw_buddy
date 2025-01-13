import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/dj-rest-auth/registration/`, userData);
        return response.data;
    } catch (error) {
        console.error("Error during user registration:", error.response?.data || error.message);
        throw error;
    }
};

export const verifyEmail = async (key) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/dj-rest-auth/registration/account-confirm-email/`, { key });
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchProtectedData = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/protected-endpoint/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching protected data:", error.response?.data || error.message);
        throw error;
    }
};
