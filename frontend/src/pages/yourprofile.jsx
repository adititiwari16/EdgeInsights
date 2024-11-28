import React, { useState, useEffect } from 'react';
import { updatePhone, updateAddress, deleteAddress, getUserProfile } from "../api_services/api.js";

const YourProfile = () => {
    const [user, setUser] = useState(null); // Start with null as the user data is fetched
    const [editPhone, setEditPhone] = useState(false);
    const [newPhone, setNewPhone] = useState('');
    const [newAddress, setNewAddress] = useState({ type: '', value: '' });

    useEffect(() => {
        // Fetch the user profile after the component is mounted
        const fetchUserProfile = async () => {
            try {
                const userId = 'someUserId'; // Replace with actual user ID (e.g., from JWT token)
                const fetchedUser = await getUserProfile(userId);
                setUser(fetchedUser);
                setNewPhone(fetchedUser.phone); // Set the initial phone value
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Handle phone change
    const handlePhoneChange = async () => {
        try {
            await updatePhone(newPhone);
            setUser({ ...user, phone: newPhone });
            setEditPhone(false);
        } catch (error) {
            console.error('Error updating phone number:', error);
        }
    };

    // Handle address change
    const handleAddressChange = async (addressId) => {
        try {
            await updateAddress(addressId, newAddress);
            setUser((prevUser) => {
                const updatedAddresses = prevUser.addresses.map((address) =>
                    address._id === addressId ? { ...address, ...newAddress } : address
                );
                return { ...prevUser, addresses: updatedAddresses };
            });
            setNewAddress({ type: '', value: '' });
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    // Handle address deletion
    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId);
            setUser((prevUser) => ({
                ...prevUser,
                addresses: prevUser.addresses.filter((address) => address._id !== addressId),
            }));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Show a loading state until the user data is fetched
    }

    return (
        <section style={{ fontFamily: 'Montserrat' }} className="bg-[#071e34] flex font-medium items-center justify-center min-h-screen">
            <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img
                        src={user.profilePicture || "https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"} // Use dynamic profile picture if available
                        alt="profile picture"
                        className="rounded-full w-28"
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-white font-bold text-2xl tracking-wide">
                        {user.firstName} <br /> {user.lastName}
                    </h2>
                </div>

                <div className="mt-5 text-white text-sm">
                    <p>
                        <span className="text-gray-400 font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="mt-3">
                        <span className="text-gray-400 font-semibold">Phone:</span> 
                        {editPhone ? (
                            <>
                                <input
                                    type="text"
                                    value={newPhone}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    className="bg-[#20354b] text-white border border-gray-400 p-2 rounded"
                                />
                                <button onClick={handlePhoneChange}>Save</button>
                            </>
                        ) : (
                            <>
                                {user.phone}
                                <button onClick={() => setEditPhone(true)}>Edit</button>
                            </>
                        )}
                    </p>
                </div>

                <div className="mt-5">
                    <h3 className="text-gray-400 font-semibold text-sm mb-2">Addresses:</h3>
                    {user.addresses.map((address) => (
                        <div key={address._id} className="text-white text-sm mt-2">
                            <span className="text-gray-400">{address.type}:</span> {address.value}
                            <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
                            <button onClick={() => handleAddressChange(address._id)}>Edit</button>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default YourProfile;
