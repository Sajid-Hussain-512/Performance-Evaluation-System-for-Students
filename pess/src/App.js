import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
// import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import StudentsData from "./components/StudentsData";
import TeachersData from "./components/TeachersData";
import Classes from "./components/Classes";
import Search from "./components/Search";
import TeacherLogin from "./components/TeacherLogin";
import StudentLogin from "./components/StudentLogin";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          {/* <Route exact path="/AdminLogin/" element={<Home />} /> */}
          <Route exact path="/TeacherLogin" element={<TeacherLogin />} />
          <Route exact path="/StudentLogin" element={<StudentLogin />} />
          <Route exact path="/AdminLogin/" element={<StudentsData />} />
          <Route exact path="/AdminLogin/Home" element={<Home />} />
          <Route exact path="/AdminLogin/Students" element={<StudentsData />} />
          <Route exact path="/AdminLogin/Teachers" element={<TeachersData />} />
          <Route exact path="/AdminLogin/Classes" element={<Classes />} />
          <Route exact path="/AdminLogin/Search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
