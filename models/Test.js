const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  staffID: { type: String, required: true },
  studentID: { type: String, required: true },
  CourseCode: { type: String, required: true },
  questions: [
    {
      question: { type: String },
      studentResponse: { type: String },
      correctAnswer: { type: String },
      review: { type: String },
    },
  ],
});

mongoose.models = {};
export default mongoose.models.Test || mongoose.model("Test", TestSchema);
