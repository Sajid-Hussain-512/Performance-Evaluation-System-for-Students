const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// Example
// app.post("/auth", async (req, res) => {
//   try {
//     console.log("Hey it's auth", req.query.id);
//     res.send("I am from auth" + req.query.id);

//   } catch (error) {
//     console.error(error);
//   }
// });

app.post("/auth", async (request, response) => {
  try {
    // console.log(request.body);
    const uname = request.body.uname;
    const pass = request.body.pass;                                                            
    // console.log(uname, pass);
    const selectQuery =
      "SELECT role FROM users WHERE name LIKE $1 AND password LIKE $2;";
    const allUsers = await pool.query(selectQuery, [uname, pass]);

    if (allUsers.rowCount != 1) {
      allUsers.rows[0] = { role: -1 };
      // throw new Error("No data found");
    }
    response.json(allUsers.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.post("/selectAll", async (request, response) => {
  try {
    const tableName = request.body.tname;
    // console.log(tableName);
    const selectQuery = "SELECT * FROM " + tableName;
    const allData = await pool.query(selectQuery);
    response.json(allData.rows);
  } catch (error) {
    response.json(null);
    // response.send(error);
  }
});

app.post("/getUname", async (request, response) => {
  try {
    const id = request.body.id;
    // console.log("From getUname");
    const selectQuery = "SELECT name FROM users WHERE id = " + id;
    const allData = await pool.query(selectQuery);
    // console.log(allData.rows[0].name);
    response.json(allData.rows[0].name);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/addUser", async (request, response) => {
  try {
    // console.log(request.body)
    const { username, password, role } = request.body;
    const insertQuery =
      "INSERT INTO users (name, password, role) VALUES($1, $2, $3) RETURNING id";
    const details = await pool.query(insertQuery, [username, password, role]);
    // console.log(details.rows[0].id);
    response.json(details);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/addStudent", async (request, response) => {
  try {
    // console.log(request.body);
    const { studentName, standard, school, dob, address, uid } = request.body;
    const insertQuery =
      "INSERT INTO student (name, class, school, dob, address, id) VALUES ($1, $2, $3, $4, $5, $6)";
    const responseJson = await pool.query(insertQuery, [
      studentName,
      standard,
      school,
      dob,
      address,
      uid,
    ]);
    // console.log(responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/updateStudent", async (request, response) => {
  try {
    // console.log(request.body);
    const { studentName, standard, school, dob, address, uid } = request.body;
    const updateQuery =
      "UPDATE student SET name = $1, class = $2, school = $3, dob = $4, address = $5 WHERE id = $6";
    const responseJson = await pool.query(updateQuery, [
      studentName,
      standard,
      school,
      dob,
      address,
      uid,
    ]);
    // console.log(responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/deleteUser", async (request, response) => {
  try {
    // console.log(request.body);
    const { id } = request.body;
    const deleteQuery = "DELETE FROM users WHERE id = $1";
    const responseJson = await pool.query(deleteQuery, [id]);
    // console.log("DELETE USER: \n", responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/deleteStudent", async (request, response) => {
  try {
    // console.log(request.body);
    const { id } = request.body;
    const deleteQuery = "DELETE FROM student WHERE id = $1";
    const responseJson = await pool.query(deleteQuery, [id]);
    // console.log("DELETE STUDENT: \n", responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/addTeacher", async (request, response) => {
  try {
    // console.log(request.body);
    const { teacherName, salary, qualifications, address, uid } = request.body;
    const insertQuery =
      "INSERT INTO teacher (name, salary, qualifications, address, id) VALUES ($1, $2, $3, $4, $5)";
    const responseJson = await pool.query(insertQuery, [
      teacherName,
      salary,
      qualifications,
      address,
      uid,
    ]);
    // console.log(responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/updateTeacher", async (request, response) => {
  try {
    // console.log(request.body);
    const { teacherName, salary, qualifications, address, uid } = request.body;
    const updateQuery =
      "UPDATE teacher SET name = $1, salary = $2, qualifications = $3, address = $4 WHERE id = $5";
    const responseJson = await pool.query(updateQuery, [
      teacherName,
      salary,
      qualifications,
      address,
      uid,
    ]);
    // console.log(responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/deleteTeacher", async (request, response) => {
  try {
    // console.log(request.body);
    const { id } = request.body;
    const deleteQuery = "DELETE FROM teacher WHERE id = $1";
    const responseJson = await pool.query(deleteQuery, [id]);
    // console.log("DELETE STUDENT: \n", responseJson);
    response.json(responseJson);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/selectSubjects", async (request, response) => {
  try {
    // console.log(request.body);
    const { cid } = request.body;
    const selectQuery =
      "SELECT s.sid, s.name FROM subject s, taught t WHERE t.sid = s.sid AND t.cid = $1";
    const responseJson = await pool.query(selectQuery, [cid]);
    response.json(responseJson.rows);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/selectSubjectsByClass", async (request, response) => {
  try {
    // console.log(request.body);
    const { name } = request.body;
    const selectQuery = "SELECT s.sid, s.name FROM class c, subject s, taught t WHERE t.cid = c.cid AND t.sid = s.sid AND c.name ILIKE $1;"
    const responseJson = await pool.query(selectQuery, [name]);
    response.json(responseJson.rows);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.post("/selectStudentOfClass", async (request, response) => {
  try {
    const { name } = request.body;
    const selectQuery = "SELECT id, name FROM student WHERE class ILIKE $1;";
    const responseJson = await pool.query(selectQuery, [name]);

    if (responseJson.rowCount === 0) {
      responseJson.rows[0] = { id: "-1", name: "No Students Found" };
    }

    response.json(responseJson.rows);
  } catch (error) {
    // response.json(null)
    response.send(error);
  }
});

app.listen(8081, () => {
  console.log("Connected...");
});
