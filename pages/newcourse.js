import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NewCourse = () => {
  const router = useRouter();
  const { staffID } = router.query;

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

  const [courseData, setCourseData] = useState(initialCourseData);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prevData) => ({ ...prevData, previewVideo: file }));
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setCourseData((prevData) => ({ ...prevData, [field]: value }));
  };
  const extractClassSchedulesFromCourses = (courses) => {
    const schedules = {};

    courses.forEach((course) => {
      Object.keys(course.classSchedules).forEach((week) => {
        if (!schedules[week]) {
          schedules[week] = {};
        }

        Object.keys(course.classSchedules[week]).forEach((day) => {
          const slot = course.classSchedules[week][day];
          if (slot) {
            if (!schedules[week][day]) {
              schedules[week][day] = [];
            }
            schedules[week][day].push(slot);
          }
        });
      });
    });

    return schedules;
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/allcourses?instructor=${staffID}`);
        if (response.ok) {
          const courses = await response.json();
          console.log("Courses:", courses);

          // Extracting class schedules from each course
          const extractedSchedules = extractClassSchedulesFromCourses(courses);
          console.log("Extracted Schedules:", extractedSchedules);

          // Merge the extracted schedules into the state
          setClassSchedules(extractedSchedules);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    if (staffID) {
      fetchCourses();
    }
  }, [staffID]);

  const handleCreateCourse = async () => {
    try {
      // Add staffID to courseData
      const dataWithStaffID = { ...courseData, staffID };
      const {
        CourseName,
        CourseLanguage,
        description,
        subscriptionType,
        teachingLevel,
        Price,
        totalHoursPerWeek,
        selectedWeek,
        classSchedules,
      } = dataWithStaffID;
      console.log("Course created with the following data:", {
        CourseName,
        CourseLanguage,
        description,
        subscriptionType,
        teachingLevel,
        Price,
        totalHoursPerWeek,
        selectedWeek,
        classSchedules,
      });

      console.log(dataWithStaffID);
      console.log("dataWithStaffID" + dataWithStaffID);
      const response = await fetch("/api/newcourse1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithStaffID),
      });

      if (response.ok) {
        console.log("Course created successfully!");
        setCourseData(initialCourseData);
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  useEffect(() => {
    if (courseData.teachingLevel === "beginner") {
      setPriceRange(
        courseData.subscriptionType === "monthly"
          ? { min: 200, max: 300 }
          : { min: 2000, max: 3000 }
      );
    } else if (courseData.teachingLevel === "intermediate") {
      setPriceRange(
        courseData.subscriptionType === "monthly"
          ? { min: 400, max: 500 }
          : { min: 4000, max: 5000 }
      );
    } else if (courseData.teachingLevel === "pro") {
      setPriceRange(
        courseData.subscriptionType === "monthly"
          ? { min: 600, max: 700 }
          : { min: 6000, max: 7000 }
      );
    }
  }, [courseData.subscriptionType, courseData.teachingLevel]);

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

  useEffect(() => {
    if (courseData.selectedWeek) {
      const currentWeekTotalHours = Object.values(
        classSchedules[courseData.selectedWeek]
      ).filter((selectedSlot) => selectedSlot !== null).length;

      if (currentWeekTotalHours > courseData.totalHoursPerWeek) {
        setClassSchedules((prevSchedules) => ({
          ...prevSchedules,
          [courseData.selectedWeek]: {
            Mon: null,
            Tue: null,
            Wed: null,
            Thu: null,
            Fri: null,
            Sat: null,
            Sun: null,
          },
        }));
      }
    }
  }, [
    courseData.totalHoursPerWeek,
    courseData.selectedWeek,
    courseData.classSchedules,
  ]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-500">
      <div className="bg-white-400 p-8 rounded-lg shadow-lg max-w-xl w-full mt-5 mb-5 text-black">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Create a New Course
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

        {/* Subscription Type Dropdown */}
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

        {/* Teaching Level Dropdown */}
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

        {/* Price Input */}
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

        {/* Total Hours Per Week */}
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

        {/* Week Selection Dropdown */}
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

        {/* Schedule Table */}
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
                      {timeSlots.map((slot) => {
                        const isSlotOccupied =
                          classSchedules[courseData.selectedWeek]?.[
                            day
                          ]?.includes(slot) ||
                          (
                            extractedSchedules[courseData.selectedWeek]?.[
                              day
                            ] || []
                          ).includes(slot);

                        return (
                          <button
                            key={slot}
                            onClick={() => handleSlotSelect(day, slot)}
                            className={`p-1 m-1 border rounded ${
                              isSlotOccupied
                                ? "bg-red-500 text-white"
                                : classSchedules[courseData.selectedWeek][
                                    day
                                  ] === slot
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                            }`}
                            disabled={isSlotOccupied}
                          >
                            {slot}
                          </button>
                        );
                      })}
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
          onClick={handleCreateCourse}
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

export default NewCourse;
