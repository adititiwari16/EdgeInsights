import React from 'react';

const YourProfile = () => {
    // Replace this with actual user data fetched from your backend or context
    const user = {
        firstName: 'Jonathan',
        lastName: 'Smith',
        email: 'jonathan.smith@example.com',
        phone: '+1-123-456-7890',
        addresses: [
            { type: 'Home', value: '123 Main St, Springfield, USA' },
            { type: 'Work', value: '456 Elm St, Springfield, USA' },
        ],
    };

    return (
        <section
            style={{ fontFamily: 'Montserrat' }}
            className="bg-[#071e34] flex font-medium items-center justify-center min-h-screen"
        >
            <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img
                        src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
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
                        <span className="text-gray-400 font-semibold">Email:</span>{' '}
                        {user.email}
                    </p>
                    <p className="mt-3">
                        <span className="text-gray-400 font-semibold">Phone:</span>{' '}
                        {user.phone}
                    </p>
                </div>

                <div className="mt-5">
                    <h3 className="text-gray-400 font-semibold text-sm mb-2">Addresses:</h3>
                    {user.addresses.map((address, index) => (
                        <p key={index} className="text-white text-sm mt-2">
                            <span className="text-gray-400">{address.type}:</span> {address.value}
                        </p>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default YourProfile;
