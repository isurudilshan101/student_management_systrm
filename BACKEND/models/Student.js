const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    require: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
