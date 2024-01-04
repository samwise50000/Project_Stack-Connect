import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const navigate = useNavigate();
  const API_URL = "/user/register";

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("User signed up successfully!");

        navigate("/jobs");
      } else {
        const error = await response.json();

        alert(error.message);
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return {
    signup,
  };
}
