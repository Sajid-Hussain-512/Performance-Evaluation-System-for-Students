import { useEffect, useState } from "react";

const TeacherModal = ({ mode, setShowTeacherModal, teacher, fetchDatails }) => {
  const editMode = mode === "edit" ? true : false;
  const message =
    mode === "edit" ? "Update Teacher Details" : "Add New Teacher";

  const fetchId = async () => {
    if (editMode) {
      const body = { id: teacher.id };
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
    teacherName: editMode ? teacher.name : "",
    userName: editMode ? "" : "",
    salary: editMode ? Math.round(teacher.salary).toString() : "",
    qualifications: editMode ? teacher.qualifications : "",
    address: editMode ? teacher.address : "",
    id: editMode ? teacher.id : "",
    role: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "teacherName" && !editMode) {
      data.userName = value.split(" ")[0];
    }
    
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    
  };

  useEffect(() => fetchId, []);

  // Adding Teacher Data
  const addTeacher = async (e) => {
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
          teacherName: data.teacherName,
          salary: data.salary,
          qualifications: data.qualifications,
          address: data.address,
          uid: details.rows[0].id,
        };

        // console.log(body);
        const responseTeacher = await fetch(
          "http://localhost:8081/addTeacher",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const responseTeacherJson = await responseTeacher.json();

        if (responseTeacherJson.rowCount === 1) {
          const message =
            "New Teacher Added" +
            "\nId: " +
            details.rows[0].id +
            "\nUser Name: " +
            data.userName +
            "\nPassword: " +
            pass;

          alert(message);
          setShowTeacherModal(false);
          fetchDatails();
        }
      }
    } catch (error) {
      alert("Error Occured: ", error);
      console.error(error);
    }
  };

  // Uodate Teacher Data
  const updateTeacher = async (e) => {
    e.preventDefault();

    // console.log("Uppdate Button Clicked");

    try {
      const body = {
        teacherName: data.teacherName,
        salary: data.salary,
        qualifications: data.qualifications,
        address: data.address,
        uid: data.id,
      };

      // console.log(body);
      const responseTeacher = await fetch(
        "http://localhost:8081/updateTeacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const responseTeacherJson = await responseTeacher.json();

      if (responseTeacherJson.rowCount === 1) {
        const message = "Teacher Data Updated";

        alert(message);
        setShowTeacherModal(false);
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
          <button onClick={() => setShowTeacherModal(false)}>x</button>
        </div>

        <form className="form">
          <input
            className="mod-input"
            required
            placeholder="Enter Name"
            name="teacherName"
            value={data.teacherName}
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
            placeholder="Enter Salary"
            name="salary"
            value={data.salary}
            onChange={handleChange}
          />

          <input
            className="mod-input"
            required
            placeholder="Enter Qualifications"
            name="qualifications"
            value={data.qualifications}
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
            onClick={editMode ? updateTeacher : addTeacher}
          />
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
