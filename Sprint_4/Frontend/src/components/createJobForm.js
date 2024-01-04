import { useState } from "react";
import "./styles/jobForm.css";
import JobPreview from "./JobPreview";

function CreateJobForm() {
  // initialize job type list
  const initialTypeList = ["Full Time", "Part time", "Contract", "Trainee"];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [skills, setSkills] = useState("");
  const [type, setType] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // handle type checkbox changes
  const handleTypeChange = (event) => {
    if (event.target.checked) {
      setType((prevType) => [...prevType, event.target.value]);
    } else {
      setType((prevType) =>
        prevType.filter((type) => type !== event.target.value)
      );
    }
  };
  // ----------------------------

  // handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const job = {
      title,
      description,
      requirements,
      location,
      company: companyInfo,
      type,
      skills,
    };

    console.log("Job log1", job);

    const response = await fetch("/jobs/", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    console.log(JSON.stringify(response.body));

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setRequirements("");
      setSkills("");
      setLocation("");
      setCompanyInfo("");
      setType([]);
      setEmptyFields([]);
      console.log("New Job added", json);
    }
  };

  return (
    <div className="form-and-preview-container">
      <form className="create-job" onSubmit={handleSubmit}>
        <h3>Create Job post</h3>

        <label>Company info</label>
        <input
          type="text"
          required
          placeholder="Company & Email..."
          onChange={(e) => {
            setCompanyInfo(e.target.value);
          }}
          value={companyInfo}
          //className={emptyFields.includes("company") ? "error" : ""}
        />

        <label>Job Title:</label>
        <input
          type="text"
          required
          placeholder="Job title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          //  className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Job Description</label>
        <textarea
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Describe the Job..."
          value={description}
          // className={emptyFields.includes("description") ? "error" : ""}
        ></textarea>

        <label>Requirements</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setRequirements(e.target.value);
          }}
          placeholder="Describe needed tools..."
          value={requirements}
          // className={emptyFields.includes("requirements") ? "error" : ""}
        />

        <label>Skills</label>
        <input
          type="text"
          placeholder="Required coding skills.."
          onChange={(e) => {
            setSkills(e.target.value);
          }}
          value={skills}
          // className={emptyFields.includes("skills") ? "error" : ""}
        />

        <label>Location</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="Company location..."
          value={location}
          //  className={emptyFields.includes("location") ? "error" : ""}
        />

        <div className="job-type-form">
          <label>Type</label>

          {initialTypeList.map((typeItem, index) => (
            <div className="check-option" key={index}>
              <input
                type="checkbox"
                value={typeItem}
                onChange={handleTypeChange}
              />
              <label>{typeItem}</label>
            </div>
          ))}
        </div>

        <button>Add Job</button>
        {error && <div className="error"> {error} </div>}
      </form>
      <JobPreview
        title={title}
        description={description}
        requirements={requirements}
        skills={skills}
        location={location}
        companyInfo={companyInfo}
        type={type}
      />
    </div>
  );
}

export default CreateJobForm;
