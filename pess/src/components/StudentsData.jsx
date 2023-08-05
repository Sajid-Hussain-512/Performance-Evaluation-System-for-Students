import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StudentList from "./StudentList";
import StudentModal from "./StudentModal";

function StudentsData() {
  const [students, setStudents] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const fetchDatails = async () => {
    try {
      const body = { tname: "student" };
      // console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:8081/selectAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      setStudents(responseJson);
      // console.log(responseJson);
    } catch (error) {
      // alert("Connection Error!!!!");
      console.error(error);
    }
  };

  useEffect(() => fetchDatails, []);
  // console.log(students);

  return (
    <div>
      <Navbar />
      <div className="heading">
        <h1>Students List</h1>
        <div className="button-container">
          <button className="add" onClick={() => setShowStudentModal(true)}>
            Add
          </button>
        </div>
      </div>
      {students?.map((student) => (
        <StudentList
          key={student.id}
          student={student}
          fetchDatails={fetchDatails}
        />
      ))}

      {showStudentModal && (
        <StudentModal
          mode={"add"}
          setShowStudentModal={setShowStudentModal}
          fetchDatails={fetchDatails}
        />
      )}
    </div>
  );
}

export default StudentsData;
