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
    const slug = `${CourseCode}`;
    router.push(`/course_tutor/${slug}`);
  };
  const handleSeeEnrolledStudents = (CourseCode) => {
    const slug = `${CourseCode}`;
    router.push(`/EnrolledStudents/${slug}`);
  };
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  // Your component file

  const handleEitClick = async (
    CourseCode,
    CourseTitle,
    CourseDropDeadline
  ) => {
    // Show a confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to drop the course: ${CourseCode} - ${CourseTitle}?`
    );

    if (!confirmed) {
      // If the user cancels the action, do nothing
      return;
    }
    const currentDateTime = new Date();
    const deadline = new Date(CourseDropDeadline);
    console.log(currentDateTime.getTime());
    console.log(deadline.getTime());
    if (currentDateTime.getTime() > deadline.getTime()) {
      toast.error(
        `Cannot drop the course ${CourseCode} Drop Deadline already passed!`,
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    try {
      // Make API call to remove the course from the enrolled courses
      const response = await fetch(
        `/api/dropcourse?StudentID=${studentID}&CourseCode=${CourseCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedData = initialData.filter(
        (course) => course.CourseCode !== CourseCode
      );

      setFilteredData(updatedData);

      // Display an alert to the student
      alert(`Dropped course: ${CourseCode} - ${CourseTitle}`);

      // Now, make a call to the student data modification API
      const studentDataResponse = await fetch(
        `/api/dropcoursestudent?StudentID=${studentID}&CourseCode=${CourseCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("The email of the recpeient is" + email);
      const emailData = {
        to: email, // replace with the recipient's email
        subject: `Course Dropped ${CourseCode}`,
        text: `You have successfully dropped the course: ${CourseCode} - ${CourseTitle}`,
      };

      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          if (!emailResult.success) {
            console.error("Failed to send email:", emailResult.message);
          }
        } else {
          console.error("Failed to send email:", emailResponse.statusText);
        }
      } catch (error) {
        console.error("Error sending email:", error.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error dropping course:", error.message);
    }
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
                          key={course.id}
                          className="relative overflow-hidden border border-teal-500 hover:border-2 rounded-lg transition-all"
                        >
                          <Link href="#">
                            <img
                              src={course.imageUrl}
                              alt="course cover"
                              className="h-[200px] w-full object-cover transition-all duration-300 transform hover:scale-105"
                            />
                          </Link>
                          <div className="p-3">
                            <p className="text-lg font-semibold line-clamp-2 mb-2">
                              {course.title}
                            </p>
                            <span className="italic text-sm text-gray-500">{`${course.CourseLanguage}-${course.CourseLevel}`}</span>
                            <div className="mt-2 flex space-x-4">
                              <button
                                onClick={() => handleEditClick(course.id)}
                                className="text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-2 border border-teal-500 rounded-md transition-all duration-300"
                              >
                                See Course Contents
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
