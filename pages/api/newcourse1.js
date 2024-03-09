import Course from "../../models/Course";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method === "POST") {
      // Extract course data from the request body
      const dataWithStaffID = req.body; // Destructure dataWithStaffID
      let CourseCode = Math.floor(Math.random() * 1000000000000000);

      // Log the contents of dataWithStaffID separately
      console.log("CourseData");
      console.log("CourseCode:", CourseCode);
      console.log("Other Data:", JSON.stringify(dataWithStaffID, null, 2));

      // Create a new Course instance with the provided data
      let course = new Course({ CourseCode, ...dataWithStaffID });

      // Save the course to the database
      await course.save();

      // Respond with success status
      res.status(200).json({ success: "success" });
    } else {
      // Respond with bad request error for non-POST requests
      res.status(400).json({ error: "Bad Request" });
    }
  } catch (error) {
    // Log and respond with internal server error for exceptions
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb(handler);
