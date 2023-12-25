import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeDetails } from "../api/user_api_routes";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState();

  const fetchEmployeeDetail = useCallback(async () => {
    try {
      const response = await getEmployeeDetails(id);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setUser([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployeeDetail();
  }, [fetchEmployeeDetail]);

  return (
    <div>
      {/* <h2
        style={{ color: "red", textAlign: "center", backgroundColor: "yellow" }}
      >
        EMPLOYEE DETAILS
      </h2> */}

      <Card style={{ margin: "2% auto", textAlign: "left", width: "30%" }}>
        <Card.Header>Employee Details</Card.Header>
        <Card.Body>
          <Card.Title>{user?.firstname + " " + user?.lastname}</Card.Title>
          <br />
          <Card.Text>
            <b>Age:</b> {user?.age?.$numberDecimal}
          </Card.Text>
          <Card.Text>
            <b>Date of join:</b> {user?.dateofjoin}
          </Card.Text>
          <Card.Text>
            <b>Title: </b> {user?.title}
          </Card.Text>
          <Card.Text>
            <b>Department:</b> {user?.department}
          </Card.Text>
          <Card.Text>
            <b>Employee type:</b> {user?.type}
          </Card.Text>
          <Card.Text>
            <b>Current Status:</b>{" "}
            {user?.currentstatus === 1 ? "Active" : "Inactive"}
          </Card.Text>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </Card.Body>
      </Card>

      {/* <Table
        border={1}
        padding={5}
        style={{ margin: "2% auto", textAlign: "left", width: "30%" }}
      >
        <tr>
          <td>
            <label>First name: </label>
          </td>
          <td>{user?.firstname}</td>
        </tr>

        <tr>
          <td>
            <label>Last name: </label>
          </td>
          <td>{user?.lastname}</td>
        </tr>

        <tr>
          <td>
            <label>Age: </label>
          </td>
          <td>{user?.age}</td>
        </tr>

        <tr>
          <td>
            <label>Date of join: </label>
          </td>
          <td>{user?.dateofjoin}</td>
        </tr>

        <tr>
          <td>
            <label>Title: </label>
          </td>
          <td>{user?.title}</td>
        </tr>

        <tr>
          <td>
            <label>Department: </label>
          </td>
          <td>{user?.department}</td>
        </tr>

        <tr>
          <td>
            <label>Employee type: </label>
          </td>
          <td>{user?.type}</td>
        </tr>

        <tr>
          <td>
            <label>Current Status: </label>
          </td>
          <td>{user?.currentstatus}</td>
        </tr>

        <tr>
          <td colSpan={2} style={{ padding: "10px", textAlign: "center" }}>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </td>
        </tr>
      </Table> */}
    </div>
  );
};

export default EmployeeDetail;
