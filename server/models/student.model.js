const mongoose = require('mongoose');
const { Schema, model: _model } = mongoose;

const requiredString = { type: String, required: true };

const Student = new Schema(
  {
    firstname: requiredString,
    lastname: requiredString,
    middlename: {type: String},
    email: { ...requiredString, unique: true },
    password: requiredString,
  },
  { collection: "student-data" }
);

const model = _model("StudentData", Student);

module.exports = model;