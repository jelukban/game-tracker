import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';


function Follows({user}) {
    const [follows, setFollows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`/api/dashboard/${user.id}/follows`)
        .then((response) => response.json())
        .then((result) => {if (result.status !== 'User has no follows') {
            setFollows(result);
        }
        });
    }, []);

    useEffect(() => {
        setIsLoaded(true);
    }, [follows]);

    if (isLoaded) {
        return (
            <Card style={{ width: '18rem' }} className="follows-card">
            <Card.Header className="follows-list-title">Your Follows</Card.Header>
                <ListGroup>
                    {follows.map(follow => <ListGroup.Item
                                                action href={`/dashboard/${user.id}/follows/${follow.id}`}
                                                className="follows-list"> {follow.firstName} {follow.lastName}</ListGroup.Item>)}
                </ListGroup>
            </Card>
        );
    }
};

export default Follows;