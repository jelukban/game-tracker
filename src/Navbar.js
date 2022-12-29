import { React, useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Controller } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


function Navigationbar ({loggedIn, signOut, handleSearchResults, setSearchName, user }) {
    let navigate = useNavigate();

    if (loggedIn) {
    return (
        <Navbar bg="light" >
            <Container fluid
                        className="col-12">
                <Navbar.Brand>
                    <Controller size={30}/>
                </Navbar.Brand>
                <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}>
                    <Nav.Item>
                    <Nav.Link href="/"
                                className="col-2 me-auto">Home</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                    <NavDropdown title="Dashboard"
                                    id="dashboard-dropdown"
                                    className="col-2">
                        <NavDropdown.Item href={`/dashboard/${user.id}`}>Recommendations</NavDropdown.Item>
                        <NavDropdown.Item href={`/dashboard/${user.id}/gamesplayed`}>Played Games</NavDropdown.Item>
                        <NavDropdown.Item href={`/dashboard/${user.id}/interests`}>Interests</NavDropdown.Item>
                        <NavDropdown.Item href={`/dashboard/${user.id}/follows`}>Follows</NavDropdown.Item>
                    </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/find"
                                className="col-2 d-flex">Find</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form className="d-flex col-6"
                    onSubmit={handleSearchResults}
                    onKeyPress={(e) => {if (e.key === "Enter") {
                                    navigate('/search/results')
                                    }}}>
                    <Form.Control type="text"
                                    placeholder="Search video games"
                                    onChange={setSearchName}
                                    size="sm"
                                    id="search-bar"
                                    />
                    <Button variant="outline-success" onClick={(e) => navigate('/search/results')}>Search</Button>
                </Form>
                <Nav.Link href="/signout"
                            onClick={signOut}
                            className="ms-auto"
                            id="sign-out">
                                Sign Out
                </Nav.Link>
            </Container>
        </Navbar>
        );
    } else {
        return(
            <Navbar bg="light" >
            <Container fluid
                        className="col-12">
                <Navbar.Brand>
                    <Controller size={30}/>
                </Navbar.Brand>
                <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}>
                    <Nav.Item>
                    <Nav.Link href="/"
                                className="col-2 me-auto">Home</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form className="d-flex col-6"
                    onSubmit={handleSearchResults}
                    onKeyPress={(e) => {if (e.key === "Enter") {
                                    navigate('/search/results')
                                    }}}>
                    <Form.Control type="text"
                                    placeholder="Search video games"
                                    onChange={setSearchName}
                                    size="sm"
                                    id="search-bar"
                                    />
                    <Button variant="outline-success" onClick={(e) => navigate('/search/results')}>Search</Button>
                </Form>
                <Nav.Link href="/login"
                            className="col-1 ms-auto">Login</Nav.Link>
                <Nav.Link href="/create"
                            className="col-1 ms-auto">Create</Nav.Link>
            </Container>
        </Navbar>
        );
    };
};

export default Navigationbar;