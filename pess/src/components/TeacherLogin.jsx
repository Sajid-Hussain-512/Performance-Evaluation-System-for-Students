import React from "react";
import { useState, useEffect } from "react";
import ReportCardModal from "./ReportCardModal";

function TeacherLogin() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("V");

  const [subjects, setSubjects] = useState([]);

  const [students, setStudents] = useState([
    { id: "-1", name: "No Students Found" },
  ]);
  const [selectedStudent, setSelectedStudent] = useState("No Students Founds");

  const [subjectDetails, setSubjectDetails] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reportCard, setReportCard] = useState({});

  useEffect(() => {
    fetchClasses();
  }, []);

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  const fetchClasses = async () => {
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
      setSelectedClass(responseJson[0].name);
    } catch (error) {
      console.error("Error fetching Classes:", error);
    }
  };

  const handleSelectClassChange = (event) => {
    setSelectedClass(event.target.value);
    fetchStudents(event);
    fetchSubjects(event);
  };

  const fetchStudents = async (event) => {
    try {
      const body = { name: event.target.value };
      // console.log(body);
      const response = await fetch(
        "http://localhost:8081/selectStudentOfClass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const responseJson = await response.json();
      setStudents(responseJson);
      setSelectedStudent(responseJson[0].name);
    } catch (error) {
      console.error("Error fetching Students:", error);
    }
  };

  const handleSelectStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const fetchSubjects = async (event) => {
    try {
      const body = { name: event.target.value };
      const response = await fetch(
        "http://localhost:8081/selectSubjectsByClass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const responseJson = await response.json();
      setSubjects(responseJson);
    } catch (error) {
      console.error("Error fetching Subjects:", error);
    }
  };

  const handleMarksChange = (index, field, value) => {
    const updatedSubjectDetails = [...subjectDetails];
    updatedSubjectDetails[index] = {
      ...updatedSubjectDetails[index],
      [field]: value,
    };

    if (field === "marksObtained" && !updatedSubjectDetails[index].fullMarks) {
      updatedSubjectDetails[index].fullMarks = 100;
    }

    setSubjectDetails(updatedSubjectDetails);
  };

  // const display = () => {
  //   console.log("Selected Class: ", selectedClass);
  //   console.log("Selected Student: ", selectedStudent);
  //   console.log("Subjects: ", subjects);
  //   console.log("Marks: ", subjectDetails);
  // }

  const generate = (event) => {
    event.preventDefault();
    // Perform any necessary logic with the subjectDetails data
    console.log("Subject Details:", subjectDetails);
    generateReportCard();
    setModalIsOpen(true);
  };

  const generateReportCard = () => {
    // Perform report card generation logic using subjectDetails
    const reportCardData = {
      // Sample report card structure
      name: selectedStudent,
      class: selectedClass,
      subjects: subjectDetails,
    };
    setReportCard(reportCardData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="list-container" style={{ marginTop: "3rem" }}>
      <div className="info-container">
        <div className="title-header">
          <h3>Generate Report Card</h3>
          <div className="details">
            <table>
              <tbody>
                <tr>
                  <td>Select Class</td>
                  <td>
                    <select
                      className="report-input"
                      id="selectClass"
                      value={selectedClass}
                      onChange={handleSelectClassChange}
                    >
                      {classes.map((standard) => (
                        <option key={standard.cid} value={standard.name}>
                          {standard.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>Select Student</td>
                  <td>
                    <select
                      className="report-input"
                      id="selectStudent"
                      value={selectedStudent}
                      onChange={handleSelectStudentChange}
                    >
                      {students.map((student) => (
                        <option key={student.id} value={student.name}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {subjects.map((subject, index) => {
                  return (
                    <tr>
                      <td>{subject.name}</td>
                      <td>
                        <input
                          className="report-input"
                          type="number"
                          name={`marksObtained-${index}`}
                          value={subjectDetails[index]?.marksObtained || ""}
                          min='0'
                          onChange={(event) =>
                            handleMarksChange(
                              index,
                              "marksObtained",
                              event.target.value
                            )
                          }
                          placeholder="Marks Obtained"
                        />
                      </td>
                      <td>
                        <input
                          className="report-input"
                          type="number"
                          name={`fullMarks-${index}`}
                          value={subjectDetails[index]?.fullMarks || ""}
                          onChange={(event) =>
                            handleMarksChange(
                              index,
                              "fullMarks",
                              event.target.value
                            )
                          }
                          placeholder="Full Marks"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            
            <div className="button-container b">
              <button className="button generate" onClick={generate}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <ReportCardModal
          reportCard={reportCard}
          closeModal={() => setModalIsOpen(false)}
          handlePrint={handlePrint}
          subjects={subjects}
          subjectDetails={subjectDetails}
        />
      )}
    </div>
  );
}

export default TeacherLogin;
