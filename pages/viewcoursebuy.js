// components/PostPage.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ViewCourseBuy() {
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = async () => {
    setLoading(true);

    const res = await initializeRazorpay();
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    // Make API call to the serverless API
    const data = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taxAmt: 1, // Update with your tax amount
      }),
    }).then((t) => t.json());

    const options = {
      key: "rzp_test_nVaSW2cxt1Jb0m", // Enter the Key ID generated from the Dashboard
      name: 'Bharath Nagendra Babu',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Course Enrollment Fee',
      image: 'https://manuarora.in/logo.png',
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert('Razorpay Response: ' + response.razorpay_payment_id);
        setLoading(false);
      },
      prefill: {
        name: 'Bharath Nagendra Babu',
        email: 'bharathnagendrababu@gmail.com',
        contact: '9019321554',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          // document.body.appendChild(script);

          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };

          document.body.appendChild(script);
        });
      }

  return (
    <main className="p-6 flex flex-col max-w-6xl mx-auto min-h-screen bg-gray-100">
      <h1 className="text-4xl mt-10 p-3 text-center font-serif text-gray-800">
        Course Title
      </h1>
      <img
        src="https://wallpapercave.com/wp/wp2049736.jpg"
        alt="Course Image"
        className="mt-8 p-3 max-h-[400px] w-full object-cover shadow-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <InfoCard title="Faculty Name" value="Bharathhhhhh" />
        <InfoCard title="Level" value="Pro Max" />
        <InfoCard title="Experience" value="20 yrs" />
        <InfoCard title="Language" value="Spanish" />
      </div>
      <div className="p-6 mt-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Course Description</h2>
        <p className="text-gray-700">
          This is the course description. It provides an overview of the course
          content, goals, and what you will learn. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit...
        </p>
      </div>

      <div className="p-3 mt-6 max-w-2xl mx-auto">
        <button
          onClick={handleEnrollClick}
          className="bg-blue-500 text-white rounded-full px-6 py-3 text-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Enroll Now'}
        </button>
      </div>
    </main>
  );
}

// InfoCard component
const InfoCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded-md shadow-md">
    <span className="text-sm text-gray-600">{title}:</span>
    <span className="block text-md font-medium text-gray-800 mt-1">{value}</span>
  </div>
);
