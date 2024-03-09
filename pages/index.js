import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
require("dotenv").config();

const countries = [
  "Select Country", // Add a default option if needed
  "Afghanistan",
  "Albania",
  "Algeria",
];

export default function Home({ user, setUser }) {
  const [userType, setUserType] = useState(""); //User Type Variable which is either faculty tutor or student
  const [isSignUp, setIsSignUp] = useState(false); //To check whether the user wants to sign in or signup if signup show relevant fields and if sign in show relevant details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [nationality, setNationality] = useState("");
  //All the fields of tutor faculty and studnet handled using useState variables
  const router = useRouter();
  //UseRouter to handle router functions
  const isEmailValid = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //handleLogin function handle the login functionality of student tutor and faculty and also checks the type of userType
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      toast.error("Invalid email format!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    let data = { email, password };
    try {
      let res;
      if (userType === "student") {
        res = await fetch("/api/login_student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else if (userType === "tutor") {
        res = await fetch("/api/login_tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      let response = await res.json();
      setEmail("");
      setPassword("");
      if (response.success) {
        console.log(
          `Logging in as ${userType} with email: ${email} and password: ${password}`
        );
        localStorage.setItem("token", response.token); //Put Token to local storage which is required to be usd later for user authentication
        localStorage.setItem("email", response.email);
        localStorage.setItem("type", userType);
        if (userType === "tutor") {
          localStorage.setItem("id", response.staffID);
        } else {
          localStorage.setItem("id", response.studentID);
        }
        toast.success(`You are successfully logged in as ${userType}!`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (userType) {
          await setTimeout(() => {
            if (userType === "tutor") {
              router.push({
                pathname: "/tutor",
                query: { staffID: response.staffID },
              });
            } else if (userType === "student") {
              router.push({
                pathname: "/student",
                query: { studentID: response.studentID },
              });
            }
          }, 2000);
        }
      } else {
        toast.error("Invalid credentials!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //HandleSignup function to handle the signup functionality of the 3 users
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      toast.error("Invalid email format!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (userType === "tutor") {
      if (!email || !password || !name || !nationality) {
        toast.error("Please fill in all the required details.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } else if (userType === "student") {
      if (!email || !password || !name || !nationality) {
        toast.error("Please fill in all the required details.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    }

    let data = { email, password, name, nationality };

    try {
      let res;

      if (userType === "tutor") {
        res = await fetch("/api/signup_tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else if (userType === "student") {
        res = await fetch("/api/signup_student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      let response = await res.json();
      setEmail("");
      setName("");
      setPassword("");
      setNationality("");

      if (response.success) {
        toast.success(`Your Account has been created as a ${userType}!`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Redirect to homepage so that user needs to login after signup
        if (userType === "tutor") {
          router.push("/");
        } else if (userType === "student") {
          router.push("/");
        }
      } else {
        //If there is error in signing up
        toast.error("Signup failed. Please try again.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  //To set the user Type
  const handleUserTypeSelect = (selectedUserType) => {
    setUserType(selectedUserType);
  };

  const handleGoBack = () => {
    // Reset userType and switch back to login mode
    setUserType("");
    setIsSignUp(false);
    setEmail("");
    setPassword("");
    setName("");
    setNationality("");
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        limit={5}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colors"
      />
      {userType ? (
        <div className="border p-8 rounded-md shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4"
          />
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4"
          />
          {isSignUp && (
            <>
              {userType === "tutor" && (
                <>
                  <label className="block mb-1">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4"
                  />
                  <label className="block mb-2">Nationality</label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full p-2 mb-4"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {userType === "student" && (
                <>
                  <label className="block mb-1">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4"
                  />
                  <label className="block mb-2">Nationality</label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full p-2 mb-4"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </>
          )}

          {isSignUp ? (
            <button
              onClick={handleSignUp}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-indigo-600 text-white p-2 rounded cursor-pointer hover:bg-indigo-700"
            >
              Sign in
            </button>
          )}
          <button
            onClick={handleGoBack}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Go back to user selection
          </button>
        </div>
      ) : (
        <div className="border p-8 rounded-md shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Select User Type</h1>
          <div className="flex justify-between">
            <button
              onClick={() => handleUserTypeSelect("tutor")}
              className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
            >
              Tutor
            </button>
            <button
              onClick={() => handleUserTypeSelect("student")}
              className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-700"
            >
              Student
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      )}
    </main>
  );
}
