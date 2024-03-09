const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  flashcardno: { type: String, required: true },
  notes: { type: String, required: true },
});

const EnrolledCourseSchema = new mongoose.Schema({
  courseID: { type: String, required: true },
  flashcards: [FlashcardSchema], // Array of flashcards for each enrolled course
});
const StudentSchema = new mongoose.Schema({
  studentID:{type:String,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nationality: { type: String, required: true },
  enrolledCourses: [EnrolledCourseSchema],
  languages:{type:[String]}
});

mongoose.models = {};
export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
