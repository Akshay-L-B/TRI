import Course from "../../models/Course";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // Extract the 'StudentID' query parameter from req.query
      const { StaffID } = req.query;

      // Check if 'StudentID' is provided
      if (!StaffID) {
        return res
          .status(400)
          .json({ error: "Missing 'Student ID' parameter" });
      }
      const courses = await Course.find({
        instructor: StaffID,
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
