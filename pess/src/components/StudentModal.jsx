import { useEffect, useState } from "react";

const StudentModal = ({ mode, setShowStudentModal, student, fetchDatails }) => {
  const editMode = mode === "edit" ? true : false;
  const message =
    mode === "edit" ? "Update Student Details" : "Add New Student";

  const fetchId = async () => {
    if (editMode) {
      const body = { id: student.id };
      try {
        const response = await fetch("http://localhost:8081/getUname", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const responseJson = await response.json();
        data.userName = responseJson;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [data, setData] = useState({
    studentName: editMode ? student.name : "",
    userName: editMode ? "" : "",
    standard: editMode ? student.class : "",
    school: editMode ? student.school : "",
    dob: editMode
      ? new Date(student.dob).getFullYear() +
        "-" +
        (new Date(student.dob).getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        new Date(student.dob).getDate().toString().padStart(2, "0")
      : new Date().toJSON().slice(0, 10),
    address: editMode ? student.address : "",
    id: editMode ? student.id : "",
    role: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "studentName" && !editMode) {
      data.userName = value.split(" ")[0];
    }

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => fetchId, []);

  // Adding Student Data
  const addStudent = async (e) => {
    e.preventDefault();

    // console.log("Add Button Clicked");
    const pass = data.userName + "@236";
    let body = {
      username: data.userName,
      password: pass,
      role: data.role,
    };

    // console.log(body);
    try {
      const responseUser = await fetch("http://localhost:8081/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const details = await responseUser.json();
      // console.log(details.rowCount, details.rows[0].id);

      if (details.rowCount === 1) {
        body = {
          studentName: data.studentName,
          standard: data.standard,
          school: data.school,
          dob: data.dob,
          address: data.address,
          uid: details.rows[0].id,
        };

        // console.log(body);
        const responseStudent = await fetch(
          "http://localhost:8081/addStudent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const responseStudentJson = await responseStudent.json();

        if (responseStudentJson.rowCount === 1) {
          const message =
            "New Student Added" +
            "\nId: " +
            details.rows[0].id +
            "\nUser Name: " +
            data.userName +
            "\nPassword: " +
            pass;

          alert(message);
          setShowStudentModal(false);
          fetchDatails();
        }
      }
    } catch (error) {
      alert("Error Occured: ", error);
      console.error(error);
    }
  };

  // Uodate Student Data
  const updateStudent = async (e) => {
    e.preventDefault();

    // console.log("Uppdate Button Clicked");

    try {
      const body = {
        studentName: data.studentName,
        standard: data.standard,
        school: data.school,
        dob: data.dob,
        address: data.address,
        uid: data.id,
      };

      // console.log(body);
      const responseStudent = await fetch(
        "http://localhost:8081/updateStudent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const responseStudentJson = await responseStudent.json();

      if (responseStudentJson.rowCount === 1) {
        const message = "Student Data Updated";

        alert(message);
        setShowStudentModal(false);
        fetchDatails();
      }
    } catch (error) {
      alert("Error Occured: ", error);
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="mod">
        <div className="form-title-container">
          <h3>{message}</h3>
          <button onClick={() => setShowStudentModal(false)}>x</button>
        </div>

        <form className="form">
          <input
            className="mod-input"
            required
            placeholder="Enter Name"
            name="studentName"
            value={data.studentName}
            onChange={handleChange}
          />

          <label htmlFor="user-name"></label>
          <input
            className="mod-input"
            name="userName"
            value={data.userName}
            placeholder="User Name"
            id="user-name"
            disabled
          />

          <input
            className="mod-input"
            required
            placeholder="Enter Class"
            name="standard"
            value={data.standard}
            onChange={handleChange}
          />

          <input
            className="mod-input"
            required
            placeholder="Enter School Name"
            name="school"
            value={data.school}
            onChange={handleChange}
          />

          <input
            className="mod-input"
            type="date"
            required
            placeholder="Enter Date of Birth"
            name="dob"
            value={data.dob}
            onChange={handleChange}
          />

          <textarea
            className="mod-input"
            required
            placeholder="Enter Address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />

          <input
            className={mode + " mod-input"}
            type="submit"
            onClick={editMode ? updateStudent : addStudent}
          />
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
