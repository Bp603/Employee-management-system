import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarLayout = () => {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {/* <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Employee</Link>
            </li>

            <li>
              <Link to="/createEmployee">Create Employee</Link>
            </li>
          </ul>
        </nav>
      </div> */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-auto" style={{ gap: "18px" }}>
            <Nav.Link className={isActive === "/" ? "active" : ""}>
              <Link to="/">Employee</Link>
            </Nav.Link>

            <Nav.Link
              className={isActive === "/createEmployee" ? "active" : ""}
            >
              <Link to="/createEmployee">Create Employee</Link>
            </Nav.Link>

            <Nav.Link
              className={isActive === "/retirementEmployee" ? "active" : ""}
            >
              <Link to="/retirementEmployee">UpComing Retirement</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarLayout;
