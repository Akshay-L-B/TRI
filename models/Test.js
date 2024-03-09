const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  staffID: { type: String, required: true },
  studentID: { type: String, required: true },
  CourseCode: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: {
        type: [String],
        // required: true,
        // validate: [arrayLimit, "{PATH} must have exactly 4 options"],
      },
      correctAnswer: { type: String, required: true },
      feedback: { type: String },
    },
  ],
});

function arrayLimit(val) {
  return val.length === 4;
}

mongoose.models = {};
export default mongoose.models.Test || mongoose.model("Test", TestSchema);
