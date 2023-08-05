import { useState } from "react";
import TeacherModal from "./TeacherModal";

const TeacherList = ({ teacher, fetchDatails }) => {
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const deleteTeacher = async () => {
    try {
      const body = {
        id: teacher.id,
      };

      // console.log(body);
      const responseTeacher = await fetch(
        "http://localhost:8081/deleteTeacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const responseTeacherJson = await responseTeacher.json();
      if (responseTeacherJson.rowCount === 1) {
        const responseUser = await fetch("http://localhost:8081/deleteUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const responseUserJson = await responseUser.json();

        if (responseUserJson.rowCount === 1) {
          const message = "Teacher Data DELETED!!!";

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
        <div className="title-header">{teacher.name}</div>
        <div className="details">
          {"Id: " + teacher.id} <br />
          {"Qualifications: " + teacher.qualifications} <br />
          {"Salary: ₹" + Math.round(teacher.salary) + "/-"} <br />
          {"Address: " + teacher.address}
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowTeacherModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteTeacher}>DELETE</button>
        </div>
      </div>

      {showTeacherModal && (
        <TeacherModal
          mode={"edit"}
          setShowTeacherModal={setShowTeacherModal}
          teacher={teacher}
          fetchDatails={fetchDatails}
        />
      )}
    </div>
  );
};

export default TeacherList;
