import React, { useCallback, useEffect, useState } from "react";
import {
  getEmployeeDetails,
  updateEmployeeDetails,
} from "../api/user_api_routes";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const EmployeeUpdate = ({ setFeedback }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    dateofjoin: "",
    title: "",
    department: "",
    type: "",
    currentstatus: 1,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      age: "",
      dateofjoin: "",
      title: "",
      department: "",
      type: "",
      currentstatus: 1,
    });
  };

  const updateEmployee = async (userData) => {
    try {
      const response = await updateEmployeeDetails(id, {
        ...userData,
        age: +userData.age,
      });
      if (response.status === 200) {
        setFeedback({
          status: "success",
          message: "Employee Update Successfully.",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setFeedback({
        status: "danger",
        message: error.message,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateEmployee(formData);
    resetForm();
  };

  const fetchEmployeeDetail = useCallback(async () => {
    try {
      const response = await getEmployeeDetails(id);
      if (response.status === 200) {
        setFormData({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          age: response.data.age?.$numberDecimal.toString(),
          dateofjoin: response.data.dateofjoin,
          title: response.data.title,
          department: response.data.department,
          type: response.data.type,
          currentstatus: 1,
        });
      }
    } catch (error) {
      console.log(error);
      setFeedback({
        status: "danger",
        message: error.message,
      });
    }
  }, [id, setFeedback]);

  useEffect(() => {
    fetchEmployeeDetail();
  }, [fetchEmployeeDetail]);
  return (
    <Container fluid="md">
      <div
        style={{
          color: "red",
          textAlign: "center",
          backgroundColor: "yellow",
          marginTop: "20px",
          padding: "8px 0px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ margin: "0px", padding: "0px" }}>UPDATE EMPLOYEE DATA</h2>
      </div>
      <br />
      <form onSubmit={submitHandler}>
        <table
          border={0}
          padding={5}
          style={{ margin: "2% auto", textAlign: "left", width: "30%" }}
        >
          <tr>
            <td>
              <label>First name: </label>
            </td>
            <td>
              <Form.Control
                type="text"
                name="firstname"
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                placeholder="Enter first name"
                value={formData.firstname}
                onChange={changeHandler}
                required
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Last name: </label>
            </td>
            <td>
              <Form.Control
                type="text"
                name="lastname"
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                placeholder="Enter last name"
                value={formData.lastname}
                onChange={changeHandler}
                required
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Age: </label>
            </td>
            <td>
              <Form.Control
                type="text"
                name="age"
                placeholder="Age"
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                onChange={changeHandler}
                value={formData.age}
                min="20"
                max="70"
                required
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Date of join: </label>
            </td>
            <td>
              <Form.Control
                type="date"
                name="dateofjoin"
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                onChange={changeHandler}
                required
                value={formData.dateofjoin}
                disabled
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Title: </label>
            </td>
            <td>
              <Form.Select
                name="title"
                onChange={changeHandler}
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                value={formData.title}
                required
              >
                <option value="">Select Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Select>
            </td>
          </tr>

          <tr>
            <td>
              <label>Department: </label>
            </td>
            <td>
              <Form.Select
                name="department"
                onChange={changeHandler}
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                value={formData.department}
                required
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Select>
            </td>
          </tr>

          <tr>
            <td>
              <label>Employee type: </label>
            </td>
            <td>
              {" "}
              <Form.Select
                name="type"
                onChange={changeHandler}
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                value={formData.type}
                required
              >
                <option value="">Select Employee Type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Select>
            </td>
          </tr>
        </table>
        <div
          style={{
            margin: "2% auto",
            textAlign: "left",
            width: "30%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button variant="primary" type="submit">
            Update
          </Button>{" "}
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>{" "}
        </div>
      </form>
    </Container>
  );
};

export default EmployeeUpdate;
