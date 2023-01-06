import { React, useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Controller } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Navigationbar ({isLoggedIn, signOut, handleSearchResults, setSearchName, user }) {
    let navigate = useNavigate();

    if (isLoggedIn) {
    return (
        <Navbar className="navbar" variant="dark" >
            <Container fluid
                        className="col-12">
                <Container className="col-1">
                <Navbar.Brand>
                    <Controller size={30}/>
                </Navbar.Brand>
                </Container>
                <Nav style={{ maxHeight: '100px' }}>
                    <Nav.Item>
                            <Nav.Link href="/" className="nav-titles">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Dashboard"
                                        id="dashboard-dropdown"
                                        className="nav-titles">
                            <NavDropdown.Item href={`/dashboard/${user.id}`}>Recommendations</NavDropdown.Item>
                            <NavDropdown.Item href={`/dashboard/${user.id}/gamesplayed`}>Played Games</NavDropdown.Item>
                            <NavDropdown.Item href={`/dashboard/${user.id}/interests`}>Interests</NavDropdown.Item>
                            <NavDropdown.Item href={`/dashboard/${user.id}/follows`}>Follows</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/find"
                                    className="nav-titles">Find</Nav.Link>
                    </Nav.Item>
                    <Form className="d-flex col-6 search-field"
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
                        <Button variant="outline-light" onClick={(e) => navigate('/search/results')} className="nav-titles me-auto">Search</Button>
                    </Form>
                    <Nav.Link href="/signout"
                                onClick={signOut}
                                className="signout col-1"
                                id="sign-out">
                                    Sign Out
                    </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        );
    } else {
        return(
            <Navbar className="navbar" variant="dark" >
            <Container fluid
                        className="col-12">
                <Container className="col-1">
                    <Navbar.Brand>
                        <Controller size={30}/>
                    </Navbar.Brand>
                </Container>
                <Nav style={{ maxHeight: '100px' }}>
                    <Nav.Item>
                    <Nav.Link href="/"
                                className="nav-titles">Home</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form className="d-flex col-6 me-auto"
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
                <Nav>
                <Nav.Link href="/login"
                            className="col-1 me-auto nav-titles">Login</Nav.Link>
                <Nav.Link href="/create"
                            className="col-1 me-auto nav-titles">Create</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        );
    };
};

export default Navigationbar;