import FollowGames from './FollowGames.js';
import { Fragment, useState, useEffect } from 'react';

function FollowPage ({users}) {
    const [follow, setFollow] = useState([]);
    const [followIsLoaded, setFollowIsLoaded] = useState(false);

    useEffect(() => {
        setFollowIsLoaded(true);
        console.log(follow);
    }, [follow]);

    // if (followIsLoaded) {
    //     <div>nothing</div>
    //     // <FollowGames user={follow} />
    // }
    return(<div>
        {users.map(user => <div onClick={setFollow(user)}> {user.firstName} {user.lastName}</div>)}
    </div>
    );
};





export default FollowPage