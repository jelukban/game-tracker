import { React, useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Controller } from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import secureLocalStorage from "react-secure-storage";

function NavigationBar() {
  const navigate = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : undefined;
  const isLoggedIn = secureLocalStorage.getItem("authorized");

  const handleSignOut = () => {
    secureLocalStorage.clear();
  };
  const [searchName, setSearchName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let queryString = new URLSearchParams({
      gameName: searchName,
    }).toString();
    let url = `/search/games/${queryString}`;
    navigate(`/search/games/${queryString}`);
  };

  if (isLoggedIn) {
    return (
      <Container fluid>
        <Navbar className="navbar row" variant="dark">
          <Nav className="nav">
            <Navbar.Brand className="col-1 navbar-brand">
              <Controller size={30} />
            </Navbar.Brand>
            <Nav.Item className="col-1">
              <Nav.Link href="/explore" className="nav-titles">
                Explore
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-1">
              <NavDropdown
                title="Dashboard"
                id="dashboard-dropdown"
                className="nav-titles"
              >
                <NavDropdown.Item href={`/dashboard/recommendations`}>
                  Recommendations
                </NavDropdown.Item>
                <NavDropdown.Item href={`/dashboard/gamesplayed`}>
                  Played Games
                </NavDropdown.Item>
                <NavDropdown.Item href={`/dashboard/interests`}>
                  Interests
                </NavDropdown.Item>
                <NavDropdown.Item href={`/dashboard/following`}>
                  Following
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item className="col-1">
              <Nav.Link href="/find" className="nav-titles">
                Find
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-5">
              <Form
                className="search-bar-form d-flex"
                onSubmit={handleSubmit}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit;
                  }
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Search video games"
                  size="sm"
                  id="search-bar"
                />
                <Button
                  variant="outline-light"
                  className="nav-titles"
                  // onClick={() => navigate(`/search/games?${queryString}`)}
                >
                  Search
                </Button>
              </Form>
            </Nav.Item>
            <Nav.Item className="col-2">
              <Nav.Link
                href="/signout"
                onClick={handleSignOut}
                id="sign-out"
                className="nav-titles"
              >
                Sign Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <Navbar className="navbar row" variant="dark">
          <Nav className="nav">
            <Navbar.Brand className="col-1 navbar-brand">
              <Controller size={30} />
            </Navbar.Brand>
            <Nav.Item className="col-1">
              <Nav.Link href="/explore" className="nav-titles">
                Explore
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-5 offset-2">
              <Form
                className="search-bar-form d-flex"
                onSubmit={handleSubmit}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit;
                  }
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Search video games"
                  size="sm"
                  id="search-bar"
                />
                <Button
                  variant="outline-light"
                  className="nav-titles"
                  // onClick={() => navigate(`/search/games?${queryString}`)}
                >
                  Search
                </Button>
              </Form>
            </Nav.Item>
            <Nav.Item className="col-1">
              <Nav.Link href="/login" className="nav-titles">
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="col-1">
              <Nav.Link href="/register" className="nav-titles">
                Create
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default NavigationBar;
