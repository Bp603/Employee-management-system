import "./App.css";
// import EmployeeDirectory from "./components/EmployeeDirectory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeView from "./components/EmployeeDetail";
import EmployeeUpdate from "./components/EmployeeUpdate";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/Navbar";
import { useState } from "react";
import EmployeeRetireTable from "./components/EmployeeRetireTable";

function App() {
  const [feedback, setFeedback] = useState({
    message: "",
    status: "",
  });
  return (
    <>
      <BrowserRouter>
        <NavbarLayout />
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeTable feedback={feedback} setFeedback={setFeedback} />
            }
          />
          <Route
            path="/createEmployee"
            element={<EmployeeCreate setFeedback={setFeedback} />}
          />
          <Route path="/viewEmployee/:id" element={<EmployeeView />} />
          <Route
            path="/updateEmployee/:id"
            element={<EmployeeUpdate setFeedback={setFeedback} />}
          />
          <Route
            path="/retirementEmployee"
            element={<EmployeeRetireTable setFeedback={setFeedback} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
