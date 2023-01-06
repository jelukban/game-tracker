import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRecommendations from './UserRecommendations.js';
import UserInterests from './UserInterests.js';
import UserPlayedGames from './UserPlayedGames.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

function SearchUsers({followerUserInfo}){
    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(false);
    const [showMessage, setShowMessage] = useState({'show': false,
                                                    'message': '',
                                                    'type': ''});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleSearchUser = (e) => {
        e.preventDefault();

        fetch('/api/search/user/email', { method: 'POST',
        body: JSON.stringify({'email':userEmail}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.status !== 'Account not found') {
                setUser({'id':result.id,
                        'firstName': result.firstName,
                        'lastName': result.lastName,
                        'email': result.email});
                setUserFound(true);
                setShow(true);
            } else {
                setShowMessage({'show': true,
                                'message': 'Email was not found',
                                'type': 'danger'});
            }
        });
    };


    const handleFollow = (e) => {
        e.preventDefault();

        fetch('/api/search/user/follow', { method: 'POST',
        body: JSON.stringify({'followUserId':followerUserInfo.id,
                        'followingUserId':user.id}),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.status === 'Follow was made!') {
                setShowMessage({'show': true,
                                'message': 'Follow was made!',
                                'type':'success'});
            } else {
                setShowMessage({'show': true,
                                'message': 'Already following this user',
                                'type': 'secondary'});
            };
        });
    };


    if (userFound) {
        return(
        <div>
            <h1>Search for another by email!</h1>
             <Form onSubmit={handleSearchUser} >
                    <Form.Group className="w-25" controlId="formFirstName">
                        <Form.Control type="text" placeholder="Email Address" onChange={(e)=>setUserEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                <Button variant="primary" type="submit">
                Search
                </Button>
            </Form>
            {showMessage.show ? <Alert variant={showMessage.type} > {showMessage.message}</Alert> : ''}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to {user.firstName}'s library!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={handleFollow}>
                        Follow
                    </Button>
                    <UserInterests user={user} />
                    <UserPlayedGames user={user} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    } else if (!userFound) {
        return(
            <div>
                <h1>Search for another by email!</h1>
                <Form onSubmit={handleSearchUser} >
                        <Form.Group className="w-25" controlId="formFirstName">
                            <Form.Control type="text" placeholder="Email Address" onChange={(e)=>setUserEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    <Button variant="primary" type="submit">
                    Search
                    </Button>
                </Form>
                {showMessage.show ? <Alert variant={showMessage.type} > {showMessage.message}</Alert> : ''}
            </div>
        )
    };

};

export default SearchUsers;