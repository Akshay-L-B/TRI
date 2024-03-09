// pages/TakeTest.js
import React, { useState } from "react";

const TakeTest = () => {
  const questions = [
    {
      question: "1+1 = ?",
      options: ["1", "2", "3", "4"],
    },
    {
      question: "2+2 ?",
      options: ["1", "2", "3", "4"],
    },
    {
      question: "1+1 = ?",
      options: ["1", "2", "3", "4"],
    },
    {
      question: "2+2 ?",
      options: ["1", "2", "3", "4"],
    },
    {
      question: "1+1 = ?",
      options: ["1", "2", "3", "4"],
    },
  ];

  const handleSubmit = () => {
    // Add your submit logic here
  };

  const handleRadioChange = (event) => {
    const questionIndex = parseInt(event.target.name.split("-")[1]) - 1;
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = event.target.value;
      return updatedAnswers;
    });
  };

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );

  return (
    <div className="max-w-2xl mx-auto p-10 bg-gray-800 rounded-lg text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz</h1>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-8">
          <div className="text-xl font-bold mb-4">
            {index + 1}) {question.question}
          </div>
          <div className="flex flex-col space-y-4">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center">
                <input
                  type="radio"
                  id={`q${index + 1}-op${optionIndex + 1}`}
                  name={`question-${index + 1}`}
                  value={option}
                  onChange={handleRadioChange}
                  checked={selectedAnswers[index] === option}
                  className="mr-2"
                />
                <label htmlFor={`q${index + 1}-op${optionIndex + 1}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TakeTest;
