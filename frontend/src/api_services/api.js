// src/api_services/api.js
const API_BASE_URL = 'http://localhost:8000';
import axios from 'axios';

export const getUserProfile = async () => {
  try {
      const response = await axios.get(`${apiUrl}/users/profile`);
      return response.data;
  } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
  }
};

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

export const updatePhone = async (phone) => {
  try {
      const response = await fetch('http://localhost:8000/user/phone', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ phone }),
      });
      return await response.json();
  } catch (error) {
      console.error('Error updating phone:', error);
      throw error;
  }
};

export const updateAddress = async (addressId, newAddress) => {
  try {
      const response = await fetch(`http://localhost:8000/user/address/${addressId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newAddress),
      });
      return await response.json();
  } catch (error) {
      console.error('Error updating address:', error);
      throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
      const response = await fetch(`http://localhost:8000/user/address/${addressId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return await response.json();
  } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
  }
};
