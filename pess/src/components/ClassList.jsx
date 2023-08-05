import { useEffect, useState } from "react";

const ClassList = ({ standard }) => {
  const [subjects, setSubjects] = useState();

  const fetchSubjects = async () => {
    try {
      const body = { cid: standard.cid };
      // console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:8081/selectSubjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let responseJson = await response.json();
      let sub = ""
      for(var subject of responseJson) {
        sub += subject.name + ", ";
      }
      setSubjects(sub.slice(0, -2));
      // setSubjects(respon.seJson.split(", "));
    } catch (error) {
      // alert("Connection Error!!!!");
      console.error(error);
    }
  };

  useEffect(() => fetchSubjects, []);
  // console.log(subjects);

  return (
    <div className="list-container">
      <div className="info-container">
        <div className="title-header">{standard.name}</div>
        <div className="details">
          {"Id: " + standard.cid} <br />
          {"Subjects: " + subjects} <br />
        </div>
        <div className="button-container">
          <button className="edit">EDIT</button>
          <button className="delete">DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
