// JobPreview.js

import { useState } from "react";
import "./styles/jobPreview.css";

const JobPreview = ({
  title,
  companyInfo,
  location,
  description,
  skills,
  requirements,
  type,
  onApplyNowClick,
  showApplyButton,
  applied,
  isJobsPage = false,
  isJobPreview = true,
  isExpanded,
}) => {
  const [size, setSize] = useState(isExpanded ? "large" : "small");

  const handleClick = () => {
    if (isJobPreview) {
      setSize(size === "small" ? "large" : "small");
    }
  };

  const handleApplyClick = () => {
    if (showApplyButton) {
      onApplyNowClick();
    }
  };

  return (
    <div className={`job-preview-frame ${size}`} onClick={handleClick}>
      {isJobsPage && (
        <>
          <h2>Information</h2>
        </>
      )}
      {isJobPreview && (
        <>
          <h2>Post Preview</h2>
          <p>Click to expand</p>
        </>
      )}
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Company:</strong> {companyInfo}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Skills:</strong> {skills}
      </p>
      {size === "large" && (
        <>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Requirements:</strong> {requirements}
          </p>
          <p>
            <strong>Type:</strong> {type.join(", ")}
          </p>
        </>
      )}
      {showApplyButton && !applied && (
        <button className="apply-button" onClick={handleApplyClick}>
          Apply Now!
        </button>
      )}
      {applied && <div className="applied-text">Applied!</div>}
    </div>
  );
};

export default JobPreview;
