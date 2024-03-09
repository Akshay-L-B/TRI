import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import styles from "@/styles/home.module.css";
import { useState, useEffect } from "react";

export default function Video() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const createAndJoin = async () => {
    const roomId = uuidv4();
    let courseCode = localStorage.getItem("courseCode");

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/seestudents?CourseCode=${courseCode}`
        );
        const data = await response.json();
        console.log(data);
        setStudentList(data[0].enrolledStudents);
        console.log(studentList);
      } catch (error) {
        console.error("Error fetching the instructor courses:", error);
      }
    };

    const fetchStudentDetails = async () => {
      try {
        if (studentList.length === 0) {
          // If studentList is empty, do nothing
          return;
        }

        const detailsPromises = studentList.map(async (studentID) => {
          const response = await fetch(
            `/api/studentdetails?StudentID=${studentID}`
          );
          console.log(response);
          const studentDetails = await response.json();
          console.log(studentDetails);
          return { studentID, ...studentDetails };
        });

        const details = await Promise.all(detailsPromises);
        setFilteredData(details);
        setInitialData(details);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchCourses();

    fetchStudentDetails();

    for (const student of filteredData) {
      const { email } = student.email;
      console.log("The email of the recpeient is" + email);
      const emailData = {
        to: email,
        subject: "Live Class Meeting ID",
        text: `${roomId} is the meeting ID for the live class meeting. Please join the meeting at the scheduled time. Thank you!`,
      };

      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          if (!emailResult.success) {
            console.error("Failed to send email:", emailResult.message);
          }
        } else {
          console.error("Failed to send email:", emailResponse.statusText);
        }
      } catch (error) {
        console.error("Error sending email:", error.message);
      }
    }
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };
  return (
    <div className={styles.homeContainer}>
      <h1>Google Meet Clone</h1>
      <div className={styles.enterRoom}>
        <input
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e?.target?.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span className={styles.separatorText}>
        --------------- OR ---------------
      </span>
      <button onClick={createAndJoin}>Create a new room</button>
    </div>
  );
}
