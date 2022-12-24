import { React, useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Controller } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Navigationbar ({loggedIn, signOut, handleSearchResults, setSearchName, user}) {
    let navigate = useNavigate();

    if (loggedIn) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Controller size={30}/></Navbar.Brand>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Dashboard" id="dashboard-dropdown">
                    <NavDropdown.Item href={`/dashboard/${user.id}`}>Recommendations</NavDropdown.Item>
                    <NavDropdown.Item href={`/dashboard/${user.id}/gamesplayed`}>Played Games</NavDropdown.Item>
                    <NavDropdown.Item href={`/dashboard/${user.id}/interests`}>Interests</NavDropdown.Item>
                    <NavDropdown.Item href={`/dashboard/${user.id}/follows`}>Follows</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/find">Find Gamers</Nav.Link>
                <Form className="d-flex" onSubmit={handleSearchResults}  onKeyPress={(e) => {
                                                                                        if (e.key === "Enter") {
                                                                                            navigate('/search/results')
                                                                                        }}}>
                    <Form.Control
                    type="search"
                    placeholder="Search Video Games"
                    className="me-2"
                    aria-label="Search"
                    onChange={setSearchName}
                    />
                    <Button variant="outline-success" onClick={(e) => navigate('/search/results')}>Search</Button>
                </Form>
                <Nav.Link href="/signout" onClick={signOut}>Sign Out</Nav.Link>
        </Nav>
        </Navbar>
        );
    } else {
        return(
            <Navbar>
                <Nav>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Form className="d-flex" onSubmit={handleSearchResults}  onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            navigate('/search/results')
                                        }}}>
                    <Form.Control
                    type="search"
                    placeholder="Search Video Games"
                    className="me-2"
                    aria-label="Search"
                    onChange={setSearchName}
                    />
                    <Button variant="outline-success" onClick={(e) => navigate('/search/results')}>Search</Button>
                </Form>
            </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/create">Create An Account</Nav.Link>
                </Nav.Item>
                </Nav>
            </Navbar>
        );
    };
};

export default Navigationbar;