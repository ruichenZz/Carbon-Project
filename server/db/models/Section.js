const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
  {
    sectionName: { type: String },
    templates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: false }
);

let Section = mongoose.model("Section", sectionSchema);

module.exports = Section;