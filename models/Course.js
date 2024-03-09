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

const CourseSchema = new mongoose.Schema(
  {
    CourseCode: { type: String, required: true },
    CourseName: { type: String, default: null },
    CourseLanguage: { type: String, unique: true },
    instructor: { type: String, default: null },
    subscriptionType: { type: String, enum: ["monthly", "yearly"] },
    Price: { type: Number },
    Level: { type: String, enum: ["beginner", "intermmediate", "pro"] },
    totalHoursPerWeek: { type: Number },
    teachingLevel: {
      type: String,
      enum: ["beginner", "intermediate", "pro"],
      default: "beginner",
    },
    classSchedules: {
      current: {
        Mon: { type: String, default: null },
        Tue: { type: String, default: null },
        Wed: { type: String, default: null },
        Thu: { type: String, default: null },
        Fri: { type: String, default: null },
        Sat: { type: String, default: null },
        Sun: { type: String, default: null },
      },
      nextWeek: {
        Mon: { type: String, default: null },
        Tue: { type: String, default: null },
        Wed: { type: String, default: null },
        Thu: { type: String, default: null },
        Fri: { type: String, default: null },
        Sat: { type: String, default: null },
        Sun: { type: String, default: null },
      },
      secondWeek: {
        Mon: { type: String, default: null },
        Tue: { type: String, default: null },
        Wed: { type: String, default: null },
        Thu: { type: String, default: null },
        Fri: { type: String, default: null },
        Sat: { type: String, default: null },
        Sun: { type: String, default: null },
      },
    },
    description: { type: String },
    previewVideo: { type: String },
    enrolledStudents: { type: [String], default: null },
    courseFeedback: [CourseFeedbackSchema],
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Course", CourseSchema) || mongoose.model.Course;
