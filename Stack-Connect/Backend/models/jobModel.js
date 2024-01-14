const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const jobSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
      required: true,
    },
    skills: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
