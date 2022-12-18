import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

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
        return(<div>
            {follows.map(follow => <Link to={`/dashboard/${user.id}/follows/${follow.id}`}> {follow.firstName} {follow.lastName}</Link>)}
        </div>
        );
        }
};

export default Follows;