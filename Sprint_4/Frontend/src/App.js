import "./App.css";
import Navbar from "./components/bNavbar";
import Hero from "./components/Hero";
import RegisterPage from "./components/RegisterPage";
import SignInPage from "./components/SignInPage";
import JobPostPage from "./components/JobPostPage";
import Footer from "./components/Footer";
import JobsPage from "./components/JobsPage";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route
            path="/"
            element={<Hero isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/register"
            element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/sign-in"
            element={<SignInPage setIsAuthenticated={setIsAuthenticated} />}
          />
          {isAuthenticated && (
            <>
              <Route path="/post-job" element={<JobPostPage />} />
              <Route path="/jobs" element={<JobsPage />} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
