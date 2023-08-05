import React, { useEffect, useRef } from "react";
import institute from "../images/institute.png";
import Chart from "chart.js/auto";

const ReportCardModal = ({
  reportCard,
  closeModal,
  handlePrint,
  subjects,
  subjectDetails,
}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const tableRef = useRef(null);


  useEffect(() => {
    if (reportCard.subjects) {
      const marksData = reportCard.subjects.map(
        (subject, index) => subjectDetails[index].marksObtained
      );
      const subjectLabels = reportCard.subjects.map(
        (subject, index) => subjects[index].name
      );
      

      const ctx = chartRef.current.getContext("2d");
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous Chart instance
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: subjectLabels,
          datasets: [
            {
              label: 'Report Card',
              data: marksData,
              backgroundColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(153, 102, 255)",
              ],
              borderColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Marks Obtained',
                fontSize: '16',
              },
            },
            x: {
                title: {
                  display: true,
                  text: 'Subjects',
                  fontSize: '16',
                },
              },
          },
          barThickness: 40,
        },
        plugins: {
            legend: {
                display: true, // Set display to false to hide the legend
              },
          },
      });
    }
  }, [reportCard.subjects, subjects]);

  useEffect(() => {
    const tableHeight = tableRef.current.offsetHeight;
    chartRef.current.style.height = `${tableHeight}px`;
  }, []);

  const calculateTotalFullMarks = () => {
    let totalFullMarks = 0;
    reportCard.subjects.forEach((subject, index) => {
      totalFullMarks += parseInt(subjectDetails[index].fullMarks, 10);
    });
    return totalFullMarks;
  };

  const calculateTotalObtainedMarks = () => {
    let totalObtainedMarks = 0;
    reportCard.subjects.forEach((subject, index) => {
      totalObtainedMarks += parseInt(subjectDetails[index].marksObtained, 10);
    });
    return totalObtainedMarks;
  };

  const calculatePercentage = () => {
    let totalFullMarks = calculateTotalFullMarks();
    let totalObtainedMarks = calculateTotalObtainedMarks();

    let percentage = (totalObtainedMarks * 100) / totalFullMarks;
    return percentage;
  };

  return (
    // <div className="overlay">
    <div className="report-mod">
      <div className="modal-content">
        <div className="report-header">
          <div>
            <img src={institute} alt="Error" />
          </div>
          <div>
            <h5>Pimpri Chinchwad Education Trust's</h5>
            <h2>Pimpri Chinchwad College Of Engineering</h2>
            <h5>Pune - 411 044</h5>
          </div>
        </div>
        <hr />

        <div className="details">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>: {reportCard.name}</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>: {reportCard.class}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />

        <div className="report-container">
          <div className="chart-container">
            <canvas ref={chartRef}/>
          </div>
          <div className="table-container" ref={tableRef}>
            <table className="marks-table">
              <thead>
                <tr className="marks-row">
                  <th className="marks-col">Subject</th>
                  <th className="marks-col">Marks Obtained</th>
                  <th className="marks-col">Full Marks</th>
                </tr>
              </thead>
              <tbody>
                {reportCard.subjects &&
                  reportCard.subjects.map((subject, index) => (
                    <tr key={index} className="marks-row">
                      <td className="marks-col">{subjects[index].name}</td>
                      <td className="marks-col-val">
                        {subjectDetails[index].marksObtained}
                      </td>
                      <td className="marks-col-val">
                        {subjectDetails[index].fullMarks}
                      </td>
                    </tr>
                  ))}

                <tr className="marks-row">
                  <th className="marks-col-val">Total</th>
                  <th className="marks-col-val">
                    {calculateTotalObtainedMarks()}
                  </th>
                  <th className="marks-col-val">{calculateTotalFullMarks()}</th>
                </tr>

                <tr className="marks-row">
                  <th className="marks-col-val" colSpan={2}>
                    Percentage
                  </th>
                  <th className="marks-col-val">{calculatePercentage()}%</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="signature-box">
          Signature
          <div className="signature"></div>
        </div>

        <div className="button-container print-button">
          <button className="edit" onClick={handlePrint}>
            Print
          </button>
          <button className="delete" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ReportCardModal;
