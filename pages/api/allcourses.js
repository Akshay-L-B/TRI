// Import necessary dependencies and models
import connectDb from "../../middleware/mongoose";
import Course from "../../models/Course";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { instructor } = req.query;

      if (!instructor) {
        return res
          .status(400)
          .json({ error: "Missing 'instructor' parameter" });
      }

      // Fetch courses where the instructor is the specified staffID
      const courses = await Course.find({ instructor });

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
