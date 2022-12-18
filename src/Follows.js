import { useState, useEffect } from 'react';
import FollowPage from './FollowPage.js'

function Follows({user}){
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
        return(<div> Is loaded
                <FollowPage users={follows} />
            </div>);
    }
};

export default Follows;