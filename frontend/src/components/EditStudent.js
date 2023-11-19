import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await axios.get(
          `http://localhost:8070/student/get/${studentId}`
        );

        console.log("RESPONSE", response.data.student_det);
        const student_details = response.data.student_det;
        setStudentData(student_details);

        setName(student_details.name);
        setAge(student_details.age);
        setGender(student_details.gender);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    fetchStudentData();

    return () => {
      // Cleanup code (if necessary)
    };
  }, [studentId]);
  console.log("studentData", studentData);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      age,
      gender,
    };

    console.log(formData);

    await axios
      .put(`http://localhost:8070/student/update/${studentId}`, formData)
      .then((response) => {
        // alert("Student Update Successfully !");
        toast.success("Successfully Updated student!", {
          position: "top-right", // Position where the notification will appear
          autoClose: 5000, // Auto-close after 3 seconds
        });
        console.log(response.data.message);
        console.log(response.data.testsome);
        setName("");
        setAge("");
        setGender("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleUpdate}>
        <div className="form-group mt-2">
          <label htmlFor="exampleInputEmail1 ">Student Name</label>
          <input
            type="text"
            className="form-control mt-2 mb-4 w-50"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Student Age</label>
          <input
            type="text"
            className="form-control mt-2 mb-4 w-50"
            id="age"
            aria-describedby="emailHelp"
            placeholder="Enter Student Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Gender</label>
          <input
            type="text"
            className="form-control mt-2 mb-4 w-50"
            id="gender"
            aria-describedby="emailHelp"
            placeholder="Enter Student Gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
