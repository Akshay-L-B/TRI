// Import necessary modules from 'next'
import Image from 'next/image';

// Other imports remain the same
import React, { useState } from 'react';

const Slug = () => {
  const [previewVideo, setPreviewVideo] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreviewVideo(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mt-5 mb-5 text-black">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Create a New Course
        </h2>
        <label className="block mb-2" htmlFor="CourseName">
          Course Name:
        </label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          id="CourseName"
          name="CourseName"
        />

        <label className="block mb-2" htmlFor="CourseLanguage">
          Course Language:
        </label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          id="CourseLanguage"
          name="CourseLanguage"
          required
        />

        <label className="block mb-2" htmlFor="level">
          Level:
        </label>
        <select
          className="w-full p-2 mb-4 border rounded"
          id="level"
          name="level"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="pro">Pro</option>
        </select>

        <label className="block mb-2" htmlFor="experience">
          Experience:
        </label>
        <select
          className="w-full p-2 mb-4 border rounded"
          id="experience"
          name="experience"
        >
          <option value="0-1">0-1 years</option>
          <option value="1-2">1-2 years</option>
          <option value="2-3">2-3 years</option>
          {/* Add other experience ranges as needed */}
        </select>

        <label className="block mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          id="description"
          name="description"
        ></textarea>

        <label className="block mb-2" htmlFor="CoursePrice">
          Course Price:
        </label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          id="CoursePrice"
          name="CoursePrice"
          required
        />

        <label className="block mb-2" htmlFor="previewVideo">
          Choose Preview Video:
        </label>
        <input
          type="file"
          id="previewVideo"
          name="previewVideo"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="mb-4">
          <div>
            <label className="block mb-2" htmlFor="day">
              Day:
            </label>
            <select className="w-full p-2 mb-2 border rounded" name="day">
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              {/* Add other days as needed */}
            </select>
            <label className="block mb-2" htmlFor="time">
              Time:
            </label>
            <select className="w-full p-2 mb-2 border rounded" name="time">
              <option value="3-5">3:00 PM - 5:00 PM</option>
              <option value="5-7">5:00 PM - 7:00 PM</option>
              {/* Add other time slots as needed */}
            </select>
          </div>
        </div>

        <button
          className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          type="submit"
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

export default Slug;
