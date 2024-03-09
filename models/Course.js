const mongoose = require("mongoose");

const CourseFeedbackSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  feedback: {
    instructorAvailability: { type: Number, default: null },
    realWorldExamples: { type: Number, default: null },
    relevantCourseContent: { type: Number, default: null },
    engagingActivities: { type: Number, default: null },
    fairAssessmentMethods: { type: Number, default: null },
    overallSatisfaction: { type: Number, default: null },
  },
});

const GradeSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  maxMarks: { type: Number, required: true },
  weightage: { type: Number, required: true },
  marksObtained: { type: Number, default: null },
});

const CourseSchema = new mongoose.Schema(
  {
    CourseCode: { type: String, required: true },
    CourseName: { type: String, default: null },
    CourseLanguage: { type: String, required: true, unique: true },
    instructor: { type: String, default: null },
    Level: { type: String, enum: ["beginner", "intermmediate", "pro"] },
    description: { type: String },
    previewVideo: { type: String, required: true },
    enrolledStudents: { type: [String], default: null },
    courseFeedback: [CourseFeedbackSchema],
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Course", CourseSchema) || mongoose.model.Course;
