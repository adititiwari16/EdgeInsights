// components/dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background-home.jpg'; // Import the image here

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#C9E6F0]" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className="py-20 bg-black bg-opacity-40 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Your EdgeInsights Dashboard</h1>
        <p className="mt-4 text-lg">Monitor your business performance, analyze competitor trends, and track key insights in real-time.</p>
      </section>

      <section className="py-16 bg-[#FBF8EF] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#000000]">Your Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Product Features</h3>
              <p className="mt-2 text-gray-700">Analyze product features from competitors to stay ahead in the market.</p>
              <Link to="/features" className="mt-4 text-[#78B3CE] hover:text-[#F96E2A]">Explore Features</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Competitor Trends</h3>
              <p className="mt-2 text-gray-700">Track the latest movements and pricing strategies of your competitors.</p>
              <Link to="/competitors" className="mt-4 text-[#78B3CE] hover:text-[#F96E2A]">View Trends</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Customer Feedback</h3>
              <p className="mt-2 text-gray-700">Monitor customer sentiment to improve your offerings.</p>
              <Link to="/feedback" className="mt-4 text-[#78B3CE] hover:text-[#F96E2A]">View Feedback</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-screen bg-cover bg-center text-white bg-black bg-opacity-40 py-16">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Real-Time Insights</h2>
            <p className="mt-4 text-lg">Stay ahead of the competition with our data-driven analysis. Think of it as your personal crystal ball—always one step ahead, predicting trends and uncovering hidden opportunities. 🌟 </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
