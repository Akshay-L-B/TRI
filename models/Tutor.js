const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  staffID:{type:String,required:true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nationality: { type: String, required: true },
  languages:{type:[String]}
});

mongoose.models = {};
export default mongoose.models.Tutor || mongoose.model("Tutor", TutorSchema);
