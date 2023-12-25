import React, { useEffect, useState } from "react";
import {
  getAllEmployee,
  deleteOneEmployee,
  getFilterEmployee,
  updateEmployeeDetails,
} from "../api/user_api_routes";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const EmployeeTable = ({ feedback, setFeedback }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [empType, setEmpType] = useState("");

  const fetchEmployeeData = async () => {
    try {
      const response = await getAllEmployee();
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const onChangeFilter = async (e) => {
    try {
      setEmpType(e.target.value);
      if (e.target.value) {
        const params = { userType: e.target.value };
        const response = await getFilterEmployee(params);
        response.status === 200 ? setUsers(response.data) : setUsers([]);
      } else {
        const response = await getAllEmployee();
        response.status === 200 ? setUsers(response.data) : setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await deleteOneEmployee(id);
      if (response.status === 200) {
        setFeedback({
          status: "success",
          message: "Employee Deleted Successfully.",
        });
        fetchEmployeeData();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setFeedback({
          status: "danger",
          message: error.response.data.message,
        });
      }
    }
  };

  const changeStatusHandler = async (e, id) => {
    try {
      const payload = { currentstatus: e.target.checked ? 1 : 0 };
      const response = await updateEmployeeDetails(id, payload);
      if (response.status === 200) {
        setFeedback({
          status: "success",
          message: "Employee Current Status Update Successfully.",
        });
        fetchEmployeeData();
      }
    } catch (error) {
      console.log(error);
      setFeedback({
        status: "danger",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Container fluid="md">
        {feedback.message && (
          <Alert
            variant={feedback.status}
            dismissible
            onClose={() => setFeedback({ status: "", message: "" })}
          >
            <p style={{ margin: "0px" }}>{feedback.message}</p>
          </Alert>
        )}
        <div
          style={{
            color: "red",
            textAlign: "center",
            backgroundColor: "yellow",
            padding: "8px 0px",
            borderRadius: "10px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: "0px", padding: "0px" }}>EMPLOYEE DETAILS</h2>
          <Form.Select
            onChange={onChangeFilter}
            value={empType}
            name="type"
            style={{
              width: "200px",
              padding: 5,
              margin: "auto 0px",
              borderRadius: 7,
            }}
          >
            <option value="">All</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Form.Select>
        </div>
        <br />
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Join</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th width="270px">Action</th>
            </tr>
          </thead>
          <tbody>
            {users !== undefined && users.length > 0 ? (
              users.map((row) => (
                <tr key={row._id}>
                  <td>{row.firstname}</td>
                  <td>{row.lastname}</td>
                  <td>{row.age.$numberDecimal}</td>
                  <td>{row.dateofjoin}</td>
                  <td>{row.title}</td>
                  <td>{row.department}</td>
                  <td>{row.type}</td>
                  <td>
                    <Form.Check
                      onChange={(e) => changeStatusHandler(e, row._id)}
                      checked={row.currentstatus === 1 ? true : false}
                      type="switch"
                      id="custom-switch"
                      label={row.currentstatus === 1 ? "Active" : "Inactive"}
                    />
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/viewEmployee/${row._id}`)}
                    >
                      View
                    </Button>{" "}
                    <Button
                      variant="success"
                      onClick={() => navigate(`/updateEmployee/${row._id}`)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteEmployee(row._id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default EmployeeTable;
