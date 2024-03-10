// components/PostPage.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Slug() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { slug } = router.query;
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/seestudents?CourseCode=${slug}`);
        const data = await response.json();
        console.log(data[0]);
        setCourseData(data[0]);
      } catch (error) {
        console.error("Error fetching the instructor courses:", error);
      }
    };

    fetchCourses();
  }, [slug]);
  // const handleEnrollClick = async () => {
  //   setLoading(true);

  //   const res = await initializeRazorpay();
  //   if (!res) {
  //     alert("Razorpay SDK Failed to load");
  //     return;
  //   }
  //   // Make API call to the serverless API
  //   const data = await fetch("/api/razorpay", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       taxAmt: 1, // Update with your tax amount
  //     }),
  //   }).then((t) => t.json());

  //   const options = {
  //     key: "rzp_test_nVaSW2cxt1Jb0m", // Enter the Key ID generated from the Dashboard
  //     name: "Bharath Nagendra Babu",
  //     currency: data.currency,
  //     amount: data.amount,
  //     order_id: data.id,
  //     description: "Course Enrollment Fee",
  //     image: "https://manuarora.in/logo.png",
  //     handler: function (response) {
  //       // Validate payment at server - using webhooks is a better idea.
  //       alert("Razorpay Response: " + response.razorpay_payment_id);
  //       setLoading(false);
  //     },
  //     prefill: {
  //       name: "Bharath Nagendra Babu",
  //       email: "bharathnagendrababu@gmail.com",
  //       contact: "9019321554",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };
  const handleEnrollClick = async () => {
    const StudentID = localStorage.getItem("id");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/enrollstudenttocourse?StudentID=${StudentID}&CourseCode=${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        // Handle successful enrollment
        console.log("Enrollment successful!");
      } else {
        // Handle enrollment failure
        console.error("Failed to enroll student");
      }
    } catch (error) {
      console.error("An unexpected error occurred during enrollment:", error);
    } finally {
      setLoading(false);
    }
  };
  // const initializeRazorpay = () => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     // document.body.appendChild(script);

  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };

  //     document.body.appendChild(script);
  //   });
  // };

  return (
    <main className="p-6 flex flex-col max-w-6xl mx-auto min-h-screen bg-gray-100">
      <h1 className="text-4xl mt-10 p-3 text-center font-serif text-gray-800">
        {courseData && courseData.CourseName}
      </h1>
      <video
        controls
        className="mt-8 p-3 max-h-[400px] w-full object-cover shadow-lg"
      >
        <source
          src="./Venice_5.mp4" // Replace with the actual path to your local video file
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <InfoCard title="Faculty Name" value={courseData.instructor} />
        <InfoCard title="Level" value={courseData.Level} />
        <InfoCard title="Experience" value={courseData.Experience} />
        <InfoCard title="Language" value={courseData.Language} />
      </div>
      <div className="p-6 mt-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Course Description</h2>
        <p className="text-gray-700">{courseData.description}</p>
      </div>

      <div className="p-3 mt-6 max-w-2xl mx-auto">
        <button
          onClick={handleEnrollClick}
          className="bg-blue-500 text-white rounded-full px-6 py-3 text-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          Enroll Now
        </button>
      </div>
    </main>
  );
}

// InfoCard component
const InfoCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded-md shadow-md">
    <span className="text-sm text-gray-600">{title}:</span>
    <span className="block text-md font-medium text-gray-800 mt-1">
      {value}
    </span>
  </div>
);
