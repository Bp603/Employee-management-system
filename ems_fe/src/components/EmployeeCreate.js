import React, { useState } from "react";
import { createEmployee } from "../api/user_api_routes";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const EmployeeCreate = ({ setFeedback }) => {
  const navigate = useNavigate();
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const InsertEmployee = async (userData) => {
    try {
      const response = await createEmployee({
        ...userData,
        age: +userData.age,
      });
      if (response.status === 200) {
        setFeedback({
          status: "success",
          message: "Employee Insert Successfully.",
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
    InsertEmployee(formData);
    resetForm();
  };
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
        <h2 style={{ margin: "0px", padding: "0px" }}>CREATE EMPLOYEE</h2>
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
                required
                name="firstname"
                style={{
                  padding: 5,
                  margin: "auto",
                  marginLeft: "5px",
                  borderRadius: 7,
                }}
                value={formData.firstname}
                onChange={changeHandler}
                placeholder="Enter first name"
                aria-label="firstname"
                aria-describedby="basic-addon1"
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
                // pattern="/^[0-9]+$/"
                required
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
            Submit
          </Button>{" "}
          <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>{" "}
        </div>
      </form>
    </Container>
  );
};

export default EmployeeCreate;
