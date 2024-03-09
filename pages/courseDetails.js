/* components/CourseDetails.js */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Sample data, replace with actual course data from your application state

const TestTable = ({ testsData }) => {
  const router = useRouter();

  const [submittedTests, setSubmittedTests] = useState([]);

  const handleTakeTest = (testNumber) => {
    // Check if the test has been submitted
    const isTestSubmitted = submittedTests.includes(testNumber);

    // If the test is not submitted, navigate to the test page
    if (!isTestSubmitted) {
      router.push(`/takeTest?testNumber=${testNumber}`);
    }
    // You can add an else condition to handle a message or other behavior
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Test Number
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Test Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Marks
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark  :text-gray-400"
                  >
                    Review
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                {testsData &&
                  testsData.map((test) => (
                    <tr key={test.testNumber}>
                      <td className="px-2 py-4 text-sm font-medium whitespace-nowrap dark:bg-gray-900">
                        <div>
                          <h4 className="text-gray-700 dark:text-gray-200">
                            {test.testNumber}
                          </h4>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-sm font-medium whitespace-nowrap dark:bg-gray-900">
                        <div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
                          {test.testName}
                        </div>
                      </td>
                      <td className="px-2 py-4 text-sm text-gray-500 font-medium whitespace-nowrap dark:bg-gray-900">
                        <div>
                          {submittedTests.includes(test.testNumber) ? (
                            // Display marks if the test has been submitted
                            <span className="text-green-500 font-bold">
                              {test.marks}
                            </span>
                          ) : (
                            // Display null or another value for not submitted tests
                            "Not Attempted"
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-4 text-sm font-medium text-gray-500 whitespace-nowrap dark:bg-gray-900">
                        <div>
                          {submittedTests.includes(test.testNumber) ? (
                            // Display "Review" button if the test has been submitted
                            <button
                              onClick={() =>
                                router.push(
                                  `/reviewTest?testNumber=${test.testNumber}`
                                )
                              }
                              className="px-4 py-2 text-sm font-medium tracking-wide text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            >
                              Review
                            </button>
                          ) : (
                            // Display null or another value for not submitted tests
                            "Not Attempted"
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap dark:bg-gray-900">
                        <div>
                          <button
                            onClick={() => handleTakeTest(test.testNumber)}
                            className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none ${
                              submittedTests.includes(test.testNumber)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-500"
                            }`}
                            disabled={submittedTests.includes(test.testNumber)}
                          >
                            Take Test
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonCard = () => {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link href="#">
        <img
          src={courseData.image}
          alt="post cover"
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{courseData.title}</p>
        <span className="italic text-sm">{courseData.subtitle}</span>
        <Link
          href="#"
          passHref
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Watch
        </Link>
      </div>
    </div>
  );
};

const Flashcard = ({ flashcard, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = () => {
    onDelete(flashcard.id);
  };

  return (
    <div
      className={`w-64 h-40 bg-white border border-gray-600 rounded-md perspective-1000 cursor-pointer transform transition-transform hover:scale-105 ${
        isFlipped ? "rotate-y-180" : ""
      }`}
      onClick={handleFlip}
    >
      <div className="w-full h-full flex flex-col justify-between items-center absolute backface-hidden p-4">
        <div className={isFlipped ? "hidden" : ""}>
          <p className="font-semibold text-lg mb-2">Title:</p>
          <p className="text-gray-700">{flashcard.question}</p>
        </div>
        <div className={isFlipped ? "" : "hidden"}>
          <p className="font-semibold text-lg mb-2">Description:</p>
          <p className="text-gray-700">{flashcard.answer}</p>
        </div>
        <button
          onClick={handleDelete}
          className="bg-black text-white px-2 py-1 rounded-md mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const AddFlashcardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-600 font-semibold mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-600 font-semibold mb-2"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-all duration-300"
      >
        Add Flashcard
      </button>
    </form>
  );
};

const CourseDetails = () => {
  const router = useRouter();

  const { CourseCode, studentID } = router.query;
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data from the API
        const response = await fetch(
          `/api/seestudents?CourseCode=${CourseCode}`
        );
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    // Check if CourseCode is available before making the request
    if (CourseCode) {
      fetchCourseData();
    }
  }, [CourseCode]);

  const [studentFlashCards, setFlashCards] = useState(null);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data from the API
        const response = await fetch(
          `/api/studentdetails?StudentID=${StudentID}`
        );
        const data = await response.json();
        setFlashCards(data[0].enrolledCourses);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    // Check if CourseCode is available before making the request
    if (CourseCode) {
      fetchCourseData();
    }
  }, [studentID]);

  const filteredFlashCards = studentFlashCards
    ? studentFlashCards
        .filter((enrolledCourse) => enrolledCourse.CourseCode === CourseCode)
        .map((enrolledCourse) => enrolledCourse.flashcards)
        .flat()
    : [];

  const [allTests, setAllTests] = useState([]);
  useEffect(() => {
    const fetchAllTests = async () => {
      try {
        // Fetch all tests from the API
        const response = await fetch(
          `/api/getTest?StudentID=${StudentID}&CourseCode=${CourseCode}`
        );
        const data = await response.json();
        setAllTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchAllTests();
  }, []);
  const dummyTestsData = [
    {
      testNumber: 1,
      testName: "Math Test",
      marks: 85, // Marks can be null initially
    },
    {
      testNumber: 2,
      testName: "Science Test",
      marks: null,
    },
    {
      testNumber: 3,
      testName: "English Test",
      marks: 72,
    },
    {
      testNumber: 4,
      testName: "History Test",
      marks: null,
    },
  ];
  const [showAddForm, setShowAddForm] = useState(false);

  const testsData = [
    { testNumber: 1, testName: "Math Test 1" },
    { testNumber: 2, testName: "English Test 1" },
    { testNumber: 3, testName: "Science Test 1" },
    // Add more test data as needed
  ];

  const addNewFlashcard = ({ title, description }) => {
    // Add logic to add a new flashcard
    const newFlashcard = {
      id: `${filteredFlashCards.length + 1}`,
      question: title,
      answer: description,
    };
    setFlashCards((prevFlashCards) => {
      // Check if prevFlashCards is an array
      if (Array.isArray(prevFlashCards)) {
        return [...prevFlashCards, { CourseCode, flashcards: [newFlashcard] }];
      } else {
        // If not an array, initialize with a new array
        return [{ CourseCode, flashcards: [newFlashcard] }];
      }
    });

    setShowAddForm(false);
  };

  const handleDeleteFlashcard = (flashcardId) => {
    // Fix the typo here
    setFlashCards((prevFlashcards) =>
      prevFlashcards.filter((flashcard) => flashcard.id !== flashcardId)
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {courseData && courseData.title}
        </h2>
      </div>
      <p className="text-gray-700 mb-4">{courseData && courseData.subtitle}</p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Flashcards</h3>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={`bg-${
          showAddForm ? "black" : "black"
        } text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-${
          showAddForm ? "black" : "black"
        } m-2`}
      >
        {showAddForm ? "Cancel" : "Add Flashcard"}
      </button>

      {showAddForm && <AddFlashcardForm onSubmit={addNewFlashcard} />}
      <div className="flex gap-3 m-2 p-2 sm:grid-cols-2">
        {filteredFlashCards &&
          filteredFlashCards.map((flashcard) => (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              onDelete={handleDeleteFlashcard}
            />
          ))}
      </div>
      <Link
        href="/video?courseCode=1234"
        className="bg-black text-white px-4 py-2 rounded-md m-2"
        passHref
      >
        Live Class
      </Link>

      <TestTable testsData={dummyTestsData} />
    </div>
  );
};

export default CourseDetails;
