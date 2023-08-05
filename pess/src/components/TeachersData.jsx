import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TeacherList from "./TeacherList";
import TeacherModal from "./TeacherModal";

function TeachersData() {
  const [teachers, setTeachers] = useState(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const fetchDatails = async () => {
    try {
      const body = { tname: "teacher" };
      // console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:8081/selectAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      setTeachers(responseJson);
      // console.log(responseJson);
    } catch (error) {
      // alert("Connection Error!!!!");
      console.error(error);
    }
  };

  useEffect(() => fetchDatails, []);
  console.log(teachers);

  return (
    <div>
      <Navbar />
      <div className="heading">
        <h1>Teachers List</h1>
        <div className="button-container">
          <button className="add" onClick={() => setShowTeacherModal(true)}>
            Add
          </button>
        </div>
      </div>
      
      {teachers?.map((teacher) => (
        <TeacherList
          key={teacher.id}
          teacher={teacher}
          fetchDatails={fetchDatails}
        />
      ))}

      {showTeacherModal && (
        <TeacherModal
          mode={"add"}
          setShowTeacherModal={setShowTeacherModal}
          fetchDatails={fetchDatails}
        />
      )}
    </div>
  );
}

export default TeachersData;
