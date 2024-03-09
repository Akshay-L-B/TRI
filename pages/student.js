import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Student = ({ logout }) => {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      }
    };

    checkToken();
  }, []);

  const [initialData, setInitialData] = useState([]);
  const { studentID } = router.query;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const handleCourseClick = (CourseCode) => {
    const slug = `${CourseCode}`;
    router.push(`/showgrades/${slug}?StudentID=${studentID}`);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (studentID) {
          const response = await fetch(
            `/api/studentdetails?StudentID=${studentID}`
          );
          const data = await response.json();
          setStudentData(data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [studentID]);
  const [notifications1, setNotifications1] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (studentID) {
          const response = await fetch(
            `/api/allcoursesfilter?StudentID=${studentID}`
          );
          const data = await response.json();
          setInitialData(data);
          setFilteredData(data);
          console.log(filteredData);
        }
      } catch (error) {
        console.error("Error fetching the instructor courses:", error);
      }
    };

    fetchCourses();
  }, [studentID]);
  const [tutorSearchOption, setTutorSearchOption] = useState("course");
  const [tutorSearchQuery, setTutorSearchQuery] = useState("");
  const [tutorPricing, setTutorPricing] = useState("");
  const [tutorLanguage, setTutorLanguage] = useState("");
  const [tutorExperience, setTutorExperience] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = initialData.filter((course) => {
      const courseTitleMatch = course.CourseName.toLowerCase().includes(query);
      const tutorNameMatch = course.instructor.toLowerCase().includes(query);
      const languageMatch =
        !tutorLanguage ||
        course.CourseLanguage.toLowerCase().includes(tutorLanguage);
      const experienceMatch =
        !tutorExperience ||
        course.Experience.toLowerCase().includes(tutorExperience);
      const pricingMatch =
        !tutorPricing || course.Pricing.toLowerCase().includes(tutorPricing);

      if (tutorSearchOption === "course") {
        return courseTitleMatch && languageMatch && pricingMatch;
      } else if (tutorSearchOption === "tutor") {
        return (
          tutorNameMatch && languageMatch && experienceMatch && pricingMatch
        );
      }

      return false;
    });

    setTutorSearchQuery(query);
    setFilteredData(filtered);
  };
  const handleCourseDetails = (course) => {
    const slug = `${course.CourseCode}`;
    router.push(`/ViewCourseBuy/${slug}`);
  };
  return (
    <>
      <div className="flex">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={5}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colors"
        />
        <div className="w-70 h-full-fixed">
          <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-col justify-between flex-1 mt-6 w-full">
              <nav>
                <Link
                  href={`/student?studentID=${studentID}`}
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/myAccount",
                      query: { studentID: studentID },
                    });
                  }}
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">My Account</span>
                </button>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/enrolledcourses",
                      query: { studentID: studentID, email: studentData.email },
                    });
                  }}
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">
                    View All Enrolled Courses
                  </span>
                </button>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/timetable_student",
                      query: { ID: studentID },
                    });
                  }}
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">My Time Table</span>
                </button>
                <hr className="my-6 border-gray-200 dark:border-gray-600" />
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">Logout</span>
                </button>
              </nav>
              <div className="mt-1">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Upcoming
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-medium font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Course Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-medium font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Deadline
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                      {notifications1
                        .filter(
                          (notification) =>
                            new Date(notification.CourseRegDeadline) >
                            new Date()
                        )
                        .map((notification, index) => {
                          const currentDateTime = new Date();
                          const deadline = new Date(
                            notification.CourseRegDeadline
                          );
                          const timeDifference = deadline - currentDateTime;
                          const days = Math.floor(
                            timeDifference / (1000 * 60 * 60 * 24)
                          );
                          const hours = Math.floor(
                            (timeDifference % (1000 * 60 * 60 * 24)) /
                              (1000 * 60 * 60)
                          );
                          const minutes = Math.floor(
                            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                          );

                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-100 dark:text-gray-900">
                                  {notification.CourseCode}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-bold text-gray-500 dark:text-gray-900">
                                  {`${days} days ${hours} hours ${minutes} minutes`}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="w-4/5">
          <div className="w-full">
            <section
              className="container px-6 w-70 "
              style={{ height: "400px" }}
            >
              <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                  <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                    Available Courses
                  </button>
                </div>

                <div className="relative flex items-center mt-8 md:mt-0 space-x-4">
                  <div className="relative flex items-center mt-4 md:mt-0 space-x-4">
                    <span className="absolute left-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400 dark:text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={tutorSearchQuery}
                      placeholder="Search"
                      className="block w-full py-2 pr-2 pl-10 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-96 placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleSearch}
                    />
                  </div>
                  <select
                    className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={tutorSearchOption}
                    onChange={(e) => setTutorSearchOption(e.target.value)}
                  >
                    <option value="course">Search by Course</option>
                    <option value="tutor">Search by Tutor</option>
                  </select>

                  {tutorSearchOption === "tutor" && (
                    <div className="flex space-x-4">
                      <select
                        value={tutorLanguage}
                        onChange={(e) => setTutorLanguage(e.target.value)}
                        className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="">Select Language</option>
                        <option value="Kannada">Kannada</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                      <select
                        value={tutorExperience}
                        onChange={(e) => setTutorExperience(e.target.value)}
                        className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-2">1-2 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="3-4">3-4 years</option>
                      </select>
                      <select
                        value={tutorPricing}
                        onChange={(e) => setTutorPricing(e.target.value)}
                        className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="">Select Price</option>
                        <option value="0-100">0-100</option>
                        <option value="100-200">100-200</option>
                        <option value="200-300">200-300</option>
                        <option value="300-400">300-400</option>
                      </select>
                    </div>
                  )}
                  {tutorSearchOption === "course" && (
                    <div className="flex space-x-4">
                      <select
                        value={tutorLanguage}
                        onChange={(e) => setTutorLanguage(e.target.value)}
                        className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="">Select Language</option>
                        <option value="Kannada">Kannada</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                      <select
                        value={tutorPricing}
                        onChange={(e) => setTutorPricing(e.target.value)}
                        className="block w-32 py-2 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="">Select Price</option>
                        <option value="0-100">0-100</option>
                        <option value="100-200">100-200</option>
                        <option value="200-300">200-300</option>
                        <option value="300-400">300-400</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-full overflow-hidden border border-teal-500 hover:border-2 rounded-lg sm:w-[300px] transition-all">
                {filteredData.map((course, index) => (
                  <div key={index} className="mb-6">
                    {/* Display course information in the card */}
                    <img
                      src={course.courseImageURL} // Use the appropriate property for the course image URL
                      alt={`Course Cover - ${course.CourseCode}`}
                      className="h-[200px] w-full object-cover transition-all duration-300 transform hover:scale-105"
                    />
                    <div className="p-3">
                      <p className="text-lg font-semibold line-clamp-2 mb-2">
                        {course.CourseName}
                      </p>
                      <span className="italic text-sm text-gray-500">
                        {`Instructor: ${course.instructor}`}
                      </span>
                      {/* Add other course details as needed */}
                      <button
                        onClick={() => handleCourseDetails(course)}
                        className="block mt-2 border-t border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default Student;
