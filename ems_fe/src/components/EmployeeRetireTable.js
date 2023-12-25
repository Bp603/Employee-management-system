import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { getUpCommingRetireEmployee } from "../api/user_api_routes";

const EmployeeRetireTable = () => {
  const [users, setUsers] = useState([]);
  const [empType, setEmpType] = useState("");

  const fetchRetireingEmployeeData = useCallback(async () => {
    try {
      const params = { userType: empType };
      const response = await getUpCommingRetireEmployee(params);

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [empType]);

  const onChangeFilter = async (e) => {
    setEmpType(e.target.value);
  };

  useEffect(() => {
    fetchRetireingEmployeeData();
  }, [fetchRetireingEmployeeData]);

  return (
    <Container fluid="md">
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
        <h2 style={{ margin: "0px", padding: "0px" }}>
          UPCOMING RETIREMENT EMPLOYEE DETAILS
        </h2>
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
                <td>{row.currentstatus === 1 ? "Active" : "Inactive"}</td>
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
  );
};

export default EmployeeRetireTable;
