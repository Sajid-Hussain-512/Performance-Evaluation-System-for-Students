import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ClassList from "./ClassList";

function ClassesData() {
  const [classes, setClasses] = useState(null);

  const fetchDatails = async () => {
    try {
      const body = { tname: "class" };
      // console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:8081/selectAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      setClasses(responseJson);
      // console.log(responseJson);
    } catch (error) {
      // alert("Connection Error!!!!");
      console.error(error);
    }
  };

  useEffect(() => fetchDatails, []);
  // console.log(classes);

  return (
    <div>
      <Navbar />
      <div className="heading">
        <h1>Classes List</h1>
        <div className="button-container">
          <button className="add">Add</button>
        </div>
      </div>

      {classes?.map((standard) => (
        <ClassList key={standard.cid} standard={standard} />
      ))}
    </div>
  );
}

export default ClassesData;
