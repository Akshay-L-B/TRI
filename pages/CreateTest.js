import { useState } from "react";
import { useRouter } from "next/router";

const CreateTest = () => {
  const router = useRouter();
  const { staffID, CourseCode, studentID } = router.query;

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      feedback: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      feedback: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      feedback: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      feedback: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      feedback: "",
    },
  ]);

  const handleInputChange = (questionIndex, field, value) => {
    const updatedQuestions = [...questions];
    // If the field is "options", update the specific option value
    if (field === "options") {
      updatedQuestions[questionIndex].options = [...value.split(",")];
    } else {
      // Otherwise, update the field for the question
      updatedQuestions[questionIndex][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const staffID = router.query.staffID;
    const studentID = router.query.studentID;
    const CourseCode = router.query.courseCode;

    const data = {
      staffID,
      studentID,
      CourseCode,
      questions,
    };

    try {
      const response = await fetch("/api/createTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, e.g., redirect or show a success message
        console.log("Test created successfully");
      } else {
        // Handle error
        console.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Create Test</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Question {index + 1}</h3>
          <label className="block mb-3">
            Question:
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleInputChange(index, "question", e.target.value)
              }
              className="border rounded-md px-3 py-2 w-full mt-1"
            />
          </label>
          {Array.isArray(question.options) &&
            question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block mb-3">
                Option {optionIndex + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "options",
                      `${optionIndex + 1}. ${e.target.value}`
                    )
                  }
                  className="border rounded-md px-3 py-2 w-full mt-1"
                />
              </label>
            ))}

          <label className="block mb-3">
            Correct Answer:
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleInputChange(index, "correctAnswer", e.target.value)
              }
              className="border rounded-md px-3 py-2 w-full mt-1"
            />
          </label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
      >
        Submit Test
      </button>
    </div>
  );
};

export default CreateTest;
