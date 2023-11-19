import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";
import ReactPaginate from "react-paginate";
// import "react-paginate/dist/react-paginate.css";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8070/student/")
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteAlert(true);
  };

  // const handleConfirmDelete  = () => {
  //   console.log(studentId)
  //   axios.delete(`http://localhost:8070/student/delete/${studentId}`)
  //     .then((response) => {

  //         // If the delete operation was successful, remove the student from the state
  //         setStudents(students.filter((student) => student._id !== studentId));

  //     })
  //     .catch((error) => {
  //       console.error('Error deleting student:', error);
  //     });
  // };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      axios
        .delete(`http://localhost:8070/student/delete/${studentToDelete}`)
        .then((response) => {
          setStudents(
            students.filter((student) => student._id !== studentToDelete)
          );
          setShowDeleteAlert(false); // Close the Sweet Alert
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
          setShowDeleteAlert(false); // Close the Sweet Alert even in case of an error
        });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };

  const itemsPerPage = 10;
  const pageCount = Math.ceil(students.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedStudents = students.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="container">
      <h1>AllStudents</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                {/* For delete  */}
                <Link>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(student._id)}
                    icon={faTrash}
                  />
                </Link>
                {/* For edit */}

                <Link to={`/edit/${student._id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {showDeleteAlert && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnText="No, cancel!"
          title="Are you sure?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        >
          You will not be able to recover this student!
        </SweetAlert>
      )}
    </div>
  );
};

export default AllStudents;
