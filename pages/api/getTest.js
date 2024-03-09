import Test from "../../models/Test";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // Extract the 'CourseCode' and 'StudentID' query parameters from req.query
      const { CourseCode, StudentID } = req.query;

      // Check if both 'CourseCode' and 'StudentID' are provided
      if (!CourseCode || !StudentID) {
        return res
          .status(400)
          .json({ error: "Missing 'CourseCode' or 'StudentID' parameter" });
      }

      // Use the 'find' method to filter courses by both 'CourseCode' and 'StudentID'
      const courses = await Test.find({
        CourseCode: CourseCode,
        StudentID: StudentID, // Assuming 'students' is an array in your Test model
      });

      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
