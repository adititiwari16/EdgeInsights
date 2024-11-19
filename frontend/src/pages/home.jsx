// components/home.jsx
import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-[#C9E6F0]">
      {/* Hero Section */}
      <section className="flex justify-center items-center bg-[#78B3CE] py-20">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Welcome to EdgeInsights</h1>
          <p className="mt-4 text-lg">Unlock real-time business insights and gain a competitive edge with data-driven strategies.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#FBF8EF] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#78B3CE]">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Real-Time Data Analysis</h3>
              <p className="mt-2 text-gray-700">Analyze product features and trends with real-time data to stay ahead of the market.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Competitor Insights</h3>
              <p className="mt-2 text-gray-700">Track competitor strategies, pricing trends, and market positioning for informed decision-making.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#F96E2A]">Customer Feedback Analysis</h3>
              <p className="mt-2 text-gray-700">Gain insights from customer feedback to optimize your product offerings and improve user experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#F96E2A] py-16">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold">Ready to unlock your business insights?</h2>
          <p className="mt-4 text-lg">Join EdgeInsights today and make data-driven decisions to propel your business forward.</p>
          <a href="/signup" className="mt-6 inline-block px-6 py-3 bg-white text-[#F96E2A] rounded-full text-xl hover:bg-[#FBF8EF]">
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
