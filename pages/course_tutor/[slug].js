import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const initialCourseData = {
    CourseName: "",
    CourseLanguage: "",
    Level: "beginner",
    description: "",
    subscriptionType: "monthly",
    teachingLevel: "beginner",
    Price: 0,
    totalHoursPerWeek: 4,
    selectedWeek: "current",
    classSchedules: {
      current: {
        Mon: null,
        Tue: null,
        Wed: null,
        Thu: null,
        Fri: null,
        Sat: null,
        Sun: null,
      },
      nextWeek: {
        Mon: null,
        Tue: null,
        Wed: null,
        Thu: null,
        Fri: null,
        Sat: null,
        Sun: null,
      },
      secondWeek: {
        Mon: null,
        Tue: null,
        Wed: null,
        Thu: null,
        Fri: null,
        Sat: null,
        Sun: null,
      },
    },
  };

  const [courseData, setCourseData] = useState([]);
  const [PriceRange, setPriceRange] = useState({ min: 200, max: 300 });
  const [classSchedules, setClassSchedules] = useState({
    current: {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null,
    },
    nextWeek: {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null,
    },
    secondWeek: {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details based on course code (slug)
        const response = await fetch(`/api/seestudents?CourseCode=${slug}`);
        if (response.ok) {
          const courseDetails = await response.json();
          console.log(courseDetails[0]);
          setCourseData(courseDetails[0]);
          setClassSchedules(courseDetails[0].classSchedules);
          console.log(courseDetails[0].classSchedules);
        } else {
          console.error("Failed to fetch course details");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchData();
  }, []);
  const handleSlotSelect = (day, slot) => {
    console.log(day);
    console.log(slot);
    console.log(classSchedules);
    const selectedWeek = courseData.selectedWeek;
    const currentWeekTotalHours = Object.values(
      classSchedules[selectedWeek]
    ).filter((selectedSlot) => selectedSlot !== null).length;

    if (
      currentWeekTotalHours < courseData.totalHoursPerWeek ||
      classSchedules[selectedWeek][day] !== null
    ) {
      setClassSchedules((prevSchedules) => ({
        ...prevSchedules,
        [selectedWeek]: {
          ...prevSchedules[selectedWeek],
          [day]: classSchedules[selectedWeek][day] === slot ? null : slot,
        },
      }));
      //changing the intial course data
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        classSchedules: classSchedules,
      }));
    }
  };
  const timeSlots = ["4pm-5pm", "5pm-6pm", "6pm-7pm", "7pm-8pm", "8pm-9pm"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prevData) => ({ ...prevData, previewVideo: file }));
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setCourseData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleUpdateCourse = async () => {
    try {
      // Send updated course details to /api/updatecourse
      console.log(courseData);
      const response = await fetch("/api/updatecourse", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        console.log("Course updated successfully!");
        // Optionally, you can redirect the user to a different page after updating
        router.push("/");
      } else {
        console.error("Failed to update course");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-500">
      <div className="bg-white-400 p-8 rounded-lg shadow-lg max-w-xl w-full mt-5 mb-5 text-black">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Update Course
        </h2>
        <label className="block mb-2" htmlFor="CourseName">
          Course Title:
        </label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          id="CourseName"
          name="CourseName"
          value={courseData.CourseName}
          onChange={(e) => handleInputChange(e, "CourseName")}
        />
        <label className="block mb-2" htmlFor="CourseLanguage">
          Course Language:
        </label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          id="CourseLanguage"
          name="CourseLanguage"
          value={courseData.CourseLanguage}
          onChange={(e) => handleInputChange(e, "CourseLanguage")}
          required
        />
        <label className="block mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          id="description"
          name="description"
          value={courseData.description}
          onChange={(e) => handleInputChange(e, "description")}
        ></textarea>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Select Subscription Type:
          </label>
          <select
            value={courseData.subscriptionType}
            onChange={(e) => handleInputChange(e, "subscriptionType")}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Select Teaching Level:
          </label>
          <select
            value={courseData.teachingLevel}
            onChange={(e) => handleInputChange(e, "teachingLevel")}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Price:</label>
          <input
            type="number"
            value={courseData.Price}
            onChange={(e) => handleInputChange(e, "Price")}
            className="w-full p-2 border rounded"
            min={PriceRange.min}
            max={PriceRange.max}
          />
          <p>{`Price Range: ₹${PriceRange.min} - ₹${PriceRange.max} per ${courseData.subscriptionType}`}</p>
        </div>
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
          <label className="block mb-2 font-semibold">
            Total Hours Per Week:
          </label>
          <input
            type="number"
            value={courseData.totalHoursPerWeek}
            onChange={(e) => handleInputChange(e, "totalHoursPerWeek")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Week:</label>
          <select
            value={courseData.selectedWeek}
            onChange={(e) => handleInputChange(e, "selectedWeek")}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="current">Current Week</option>
            <option value="nextWeek">Next Week</option>
            <option value="secondWeek">Second Week</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Class Schedule for the Week:
          </label>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Day</th>
                <th className="border p-2">Available Slots</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(classSchedules[courseData.selectedWeek] || {}).map(
                (day) => (
                  <tr key={day}>
                    <td className="border p-2">{day}</td>
                    <td className="border p-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(day, slot)}
                          className={`p-1 m-1 border rounded ${
                            classSchedules[courseData.selectedWeek][day] ===
                            slot
                              ? "bg-blue-500 text-white"
                              : "bg-white"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          type="button"
          onClick={handleUpdateCourse}
        >
          Update Course
        </button>
      </div>
    </div>
  );
};

export default Slug;
