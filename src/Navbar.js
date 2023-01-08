import { React, useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Controller } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


function Navigationbar ({isLoggedIn, signOut, handleSearchResults, setSearchName, user }) {
    let navigate = useNavigate();

    if (isLoggedIn) {
    return (
            <Container fluid>
                <Navbar className="navbar row" variant="dark" >
                    <Nav className="nav">
                        <Navbar.Brand className="col-1 navbar-brand">
                            <Controller size={30}/>
                        </Navbar.Brand>
                        <Nav.Item className="col-1">
                            <Nav.Link href="/"
                                    className="nav-titles">Explore</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="col-1">
                            <NavDropdown title="Dashboard"
                                            id="dashboard-dropdown"
                                            className="nav-titles">
                                <NavDropdown.Item href={`/dashboard/${user.id}`}>Recommendations</NavDropdown.Item>
                                <NavDropdown.Item href={`/dashboard/${user.id}/gamesplayed`}>Played Games</NavDropdown.Item>
                                <NavDropdown.Item href={`/dashboard/${user.id}/interests`}>Interests</NavDropdown.Item>
                                <NavDropdown.Item href={`/dashboard/${user.id}/follows`}>Follows</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item className="col-1">
                            <Nav.Link href="/find"
                                            className="nav-titles">Find</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="col-5">
                            <Form className="search-bar-form d-flex"
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
                                <Button variant="outline-light" onClick={(e) => navigate('/search/results')} className="nav-titles">Search</Button>
                            </Form>
                        </Nav.Item>
                        <Nav.Item className="col-2">
                            <Nav.Link href="/signout"
                                        onClick={signOut}
                                        id="sign-out"
                                        className="nav-titles">
                                            Sign Out
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </Container>
        );
    } else {
        return(
            <Container fluid>
                <Navbar className="navbar row" variant="dark" >
                    <Nav className="nav">
                        <Navbar.Brand className="col-1 navbar-brand">
                            <Controller size={30}/>
                        </Navbar.Brand>
                        <Nav.Item className="col-1">
                            <Nav.Link href="/"
                                    className="nav-titles">Explore</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="col-5 offset-2">
                            <Form className="search-bar-form d-flex"
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
                                <Button variant="outline-light" onClick={(e) => navigate('/search/results')} className="nav-titles">Search</Button>
                            </Form>
                        </Nav.Item>
                        <Nav.Item className="col-1">
                            <Nav.Link href="/login"
                                        className="nav-titles">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="col-1">
                            <Nav.Link href="/create"
                                    className="nav-titles">Create</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </Container>
        );
    };
};

export default Navigationbar;