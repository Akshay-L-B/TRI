import Course from "../../models/Course";
import connectDb from "../../middleware/mongoose";
import { constant } from "lodash";

const handler = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method === "PUT") {
      // Extract course data from the request body
      const dataWithStaffID = req.body; // Destructure dataWithStaffID
      const { CourseCode } = req.query;

      // Log the contents of dataWithStaffID separately
      console.log("CourseData");
      console.log("Other Data:", JSON.stringify(dataWithStaffID, null, 2));

      // Create a new Course instance with the provided data
      let course = await Course.findOneAndUpdate(
        { CourseCode: CourseCode }, // Query condition
        dataWithStaffID, // Update object
        { new: true } // To return the updated document
      );
      // Save the course to the database

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
