import { useState } from "react";
import StudentModal from "./StudentModal";

const StudentList = ({ student, fetchDatails }) => {
  const [showStudentModal, setShowStudentModal] = useState(false);

  const deleteStudent = async () => {
    try {
      const body = {
        id: student.id,
      };

      // console.log(body);
      const responseStudent = await fetch(
        "http://localhost:8081/deleteStudent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const responseStudentJson = await responseStudent.json();
      if (responseStudentJson.rowCount === 1) {
        const responseUser = await fetch("http://localhost:8081/deleteUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const responseUserJson = await responseUser.json();

        if (responseUserJson.rowCount === 1) {
          const message = "Student Data DELETED!!!";

          alert(message);
          fetchDatails();
        }
      }
    } catch (error) {
      alert("Error Occured: ", error);
      console.error(error);
    }
  };

  return (
    <div className="list-container">
      <div className="info-container">
        <div className="title-header">{student.name}</div>
        <div className="details">
          {"Id: " + student.id}
          <br />
          {"Date of Birth: " +
            new Date(student.dob).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          <br />
          {"Age: " +
            Math.abs(
              new Date(
                Date.now() - new Date(student.dob).getTime()
              ).getUTCFullYear() - 1970
            ) +
            " years"}{" "}
          <br />
          {"Class: " + student.class} <br />
          {"School: " + student.school} <br />
          {"Address: " + student.address}
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowStudentModal(true)}>
            EDIT
          </button>
          <button className="delete" onClick={deleteStudent}>
            DELETE
          </button>
        </div>
      </div>
      
      {showStudentModal && (
        <StudentModal
          mode={"edit"}
          setShowStudentModal={setShowStudentModal}
          student={student}
          fetchDatails={fetchDatails}
        />
      )}
    </div>
  );
};

export default StudentList;
