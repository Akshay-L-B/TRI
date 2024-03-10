import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
const EnrolledCourses = ({ user }) => {
  const router = useRouter();
  //Check if the token exists in the local storage if not redirect to homepage
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
  const { studentID } = router.query;
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (studentID) {
          const response = await fetch(
            `/api/allcoursesfilterstudent?StudentID=${studentID}`
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
  const handleEditClick = (CourseCode) => {
    router.push({
      pathname: "/courseDetails",
      query: { CourseCode: CourseCode, studentID: studentID },
    });
  };

  const handleSeeEnrolledStudents = (CourseCode) => {
    const slug = `${CourseCode}`;
    router.push(`/EnrolledStudents/${slug}`);
  };
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  // Your component file

  const handleCourseFeedback = (CourseCode) => {
    router.push({
      pathname: "/coursefeedback",
      query: { CourseCode: CourseCode, StudentID: studentID },
    });
  };

  console.log("Hey how " + initialData);

  return (
    <div>
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
      <div className="min-w-full">
        <section className="container px-6 w-70" style={{ height: "400px" }}>
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="w-4/5">
                  <section
                    className="container px-6 w-70"
                    style={{ height: "400px" }}
                  >
                    <div className="mt-6 md:flex md:items-center md:justify-between">
                      <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                        <button className="px-10 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                          Enrolled Courses
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
                            <span className="italic text-sm text-gray-500">{`${course.CourseLanguage}-${course.Level}`}</span>
                            <div className="mt-2 flex space-x-4">
                              <button
                                onClick={() =>
                                  handleEditClick(course.CourseCode)
                                }
                                className="text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-2 border border-teal-500 rounded-md transition-all duration-300"
                              >
                                See Course Contents
                              </button>
                              <button
                                onClick={() =>
                                  handleCourseFeedback(course.CourseCode)
                                }
                                className="text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-2 border border-teal-500 rounded-md transition-all duration-300"
                              >
                                Course Feedback
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default EnrolledCourses;
