import React from "react";
import { Link } from "react-router-dom";

function Hero({ isAuthenticated, setIsAuthenticated }) {
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <section className="hero" id="home">
      {!isAuthenticated && (
        <div className="hero-banner">
          <h1>Stack Connect</h1>
          <p>Discover Job opportunities</p>
          <Link to="/register" className="btn hero-btn">
            Register Now
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className="hero-banner">
          <h1>Stack Connect</h1>
          <p>Discover Job opportunities</p>
          <Link to="/jobs" className="btn hero-btn">
            Find Jobs
          </Link>
          <Link to="/post-job" className="btn hero-btn">
            Post Job
          </Link>
        </div>
      )}
    </section>
  );
}

export default Hero;
