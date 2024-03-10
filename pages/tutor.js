import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Tutor = ({ logout }) => {
  const router = useRouter();
  //Check is the token exists in the local storage if not redirect to hmepage
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
  const { staffID } = router.query;
  const dummyCourses = [
    {
      id: "course1",
      title: "Learn Spanish Online",
      subtitle: "Spanish-Intermediate",
      imageUrl: "https://wallpapercave.com/wp/wp2049736.jpg",
      CourseLanguage: "Spanish",
      CourseLevel: "Intermediate",
    },
    {
      id: "course2",
      title: "Introduction to Web Development",
      subtitle: "English-Beginner",
      imageUrl: "https://wallpapercave.com/wp/wp2049737.jpg",
      CourseLanguage: "English",
      CourseLevel: "Beginner",
    },
    {
      id: "course3",
      title: "Data Science Fundamentals",
      subtitle: "English-Advanced",
      imageUrl: "https://wallpapercave.com/wp/wp2049738.jpg",
      CourseLanguage: "English",
      CourseLevel: "Advanced",
    },
    // Add more dummy courses as needed
  ];
  const [initialData, setInitialData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [feedbackStatus, setFeedbackStatus] = useState({});
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/tutorcourses?StaffID=${staffID}`);
        const data = await response.json();
        setInitialData(data);
        setFilteredData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching the instructor courses:", error);
      }
    };

    fetchCourses();
  }, []);
  const handleEditClick = (CourseCode) => {
    const slug = `${CourseCode}`;
    router.push(`/course_tutor/${slug}`);
  };
  const handleSeeEnrolledStudents = (CourseCode) => {
    const slug = `${CourseCode}`;
    router.push(`/EnrolledStudents/${slug}`);
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = initialData.filter(
      (course) =>
        course.CourseCode.toLowerCase().includes(query) ||
        course.CourseTitle.toLowerCase().includes(query)
    );

    setSearchQuery(query);
    setFilteredData(filtered);
  };
  const handleRemove = async (CourseCode, CourseTitle) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to drop the course: ${CourseCode} - ${CourseName}?`
    );

    if (userConfirmed) {
      try {
        const response = await fetch("/api/deleteCourse", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ CourseCode: CourseCode }),
        });

        if (response.ok) {
          //To remove the course from each enrolled courses of each student who has enrolled to the course which needs to be remove
          const { enrolledStudents, instructor } = await response.json();
          for (const studentID of enrolledStudents) {
            const response1 = await fetch(
              `/api/removecoursestudent?StudentID=${studentID}&CourseCode=${CourseCode}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
              }
            );

            if (!response1.ok) {
              console.error(
                `Failed to delete the course from student: ${studentID}`
              );
            }
          }
          //To remove the course from assigned courses in faculty
          const response2 = await fetch(
            `/api/removecoursefaculty?StaffID=${instructor}&CourseCode=${CourseCode}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            }
          );
          if (response2.ok) {
          } else {
            console.error("Failed to delete the course from faculty");
          }
          const updatedData = initialData.filter(
            (course) => course.CourseCode !== CourseCode
          );
          setFilteredData(updatedData);
          toast.success(`${CourseCode} Removed Successfully!`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };
  return (
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
      <div className="w-70">
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <div className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200">
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
              </div>

              <button
                onClick={() => {
                  router.push({
                    pathname: "/tutordetails",
                    query: { staffID: staffID },
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
                    pathname: "newcourse",
                    query: { staffID: staffID },
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

                <span className="mx-4 font-medium">Create A New Course</span>
              </button>
              <Link
                href={"/viewcoursefeedback"}
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
                  View Course Feed Back Forms
                </span>
              </Link>

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
          </div>
        </aside>
      </div>
      <div className="w-4/5">
        <section className="container px-6 w-70" style={{ height: "400px" }}>
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <button className="px-10 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                All Courses
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredData.map((course) => (
              <div
                key={course.CourseCode}
                className="relative overflow-hidden border border-teal-500 hover:border-2 rounded-lg transition-all"
              >
                <Link href="#">
                  <img
                    src="data:image/png;base64,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"
                    alt="course cover"
                    className="h-[200px] w-full object-cover transition-all duration-300 transform hover:scale-105"
                  />
                </Link>
                <div className="p-3">
                  <p className="text-lg font-semibold line-clamp-2 mb-2">
                    {course.CourseName}
                  </p>
                  <span className="italic text-sm text-gray-500">{`${course.CourseLanguage}-${course.CourseLevel}`}</span>
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() => handleEditClick(course.CourseCode)}
                      className="text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-2 border border-teal-500 rounded-md transition-all duration-300"
                    >
                      Update Course Details
                    </button>
                    <button
                      onClick={() =>
                        handleSeeEnrolledStudents(course.CourseCode)
                      }
                      className="text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-2 border border-teal-500 rounded-md transition-all duration-300"
                    >
                      See Enrolled Students
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Tutor;
