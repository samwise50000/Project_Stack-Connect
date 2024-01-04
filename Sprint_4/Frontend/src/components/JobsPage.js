// JobsPage.js

import React, { useState, useEffect } from "react";
import "./styles/JobsPage.css";
import jobImage from "../images/job-image.jpg";
import JobPreview from "./JobPreview";
import { useLocation } from "react-router-dom";

const JobsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const lowerCaseQuery = searchQuery.toLowerCase();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const company = job.company ? job.company.toLowerCase() : "";
    const title = job.title ? job.title.toLowerCase() : "";

    return company.includes(lowerCaseQuery) || title.includes(lowerCaseQuery);
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setAppliedJobs(new Set());
    setApplied(false);
  };

  const handleApplyNowClick = () => {
    setAppliedJobs(
      (prevAppliedJobs) => new Set([...prevAppliedJobs, selectedJob._id])
    );
    setApplied(true);

    console.log(selectedJob);
  };

  const resetFilter = async () => {
    try {
      const response = await fetch("/jobs");
      const data = await response.json();
      setJobs(data);
      setSelectedJob(null);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h2>
          Available Jobs{" "}
          <button className="refresh-button" onClick={resetFilter}>
            Show all
          </button>
        </h2>
      </div>
      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-card-container">
            <div className="job-card" onClick={() => handleJobClick(job)}>
              <img
                src={jobImage}
                alt={`Logo for ${job.company}`}
                className="company-logo"
              />
              <div className="job-details">
                <h3>{job.company}</h3>
                <p>{job.title}</p>
              </div>
            </div>
            {selectedJob && selectedJob._id === job._id && (
              <JobPreview
                title={selectedJob.title}
                companyInfo={selectedJob.company}
                location={selectedJob.location}
                skills={selectedJob.skills}
                description={selectedJob.description}
                requirements={selectedJob.requirements}
                type={selectedJob.type}
                onApplyNowClick={handleApplyNowClick}
                showApplyButton={!appliedJobs.has(selectedJob._id)}
                isJobsPage={true}
                isJobPreview={false}
                applied={applied}
                isExpanded={true} // Always expanded on JobsPage
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
