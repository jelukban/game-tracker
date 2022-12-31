import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';


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
            <div>
                <h1>
                    Your follows!
                </h1>
                <ListGroup>
                    {follows.map(follow => <ListGroup.Item action href={`/dashboard/${user.id}/follows/${follow.id}`}> {follow.firstName} {follow.lastName}</ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
};

export default Follows;