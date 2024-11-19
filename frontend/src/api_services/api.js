// src/api_services/api.js
const API_BASE_URL = 'http://localhost:8000';

export const registerUser = async (userData) => {
  try {
    console.log('Sending registration data:', userData); // Log data to be sent
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Registration failed:', errorText);
      throw new Error('Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, { // Updated endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

