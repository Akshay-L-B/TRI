import Course from "../../models/Course";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Extract the 'StudentID' and 'CourseCode' from req.body
      const { StudentID, CourseCode } = req.body;

      // Check if 'StudentID' and 'CourseCode' are provided
      if (!StudentID || !CourseCode) {
        return res
          .status(400)
          .json({ error: "Missing 'Student ID' or 'Course Code' parameter" });
      }

      // Use $addToSet to add StudentID to enrolledStudents only if it doesn't already exist
      const updatedCourse = await Course.findOneAndUpdate(
        { CourseCode },
        { $addToSet: { enrolledStudents: StudentID } },
        { new: true } // Return the updated document
      );

      // Check if the course exists
      if (!updatedCourse) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ message: "Enrollment successful" });
    } catch (error) {
      console.error("Error enrolling student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
