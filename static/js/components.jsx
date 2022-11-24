'use strict';

function VideoGame({game_id, cover_url, name, release_date}) {

    return (
        <React.Fragment>
                <Link to={`/games/${game_id}`} >
                <div className="video-game" >
                    <p>{name}</p>
                    <img src={cover_url} height="128" width="90" ></img>
                    <p> Release Date: {release_date}</p>
                    <p id='game-id'>Game Id: {game_id}</p>
                </div>
                </Link>
    </React.Fragment>
    );
};


function VideoGameContainer({games}) {
    return (
        <React.Fragment>
            <div className="grid">
                {games.map(game => <VideoGame game_id={game.id}
                                            cover_url={game.cover_url}
                                            name={game.name}
                                            release_date={game.release_date}/>)}
            </div>
        </React.Fragment>
    );
};

function Homepage ({games}) {
    return (
        <div>
            <VideoGameContainer games={games} />
        </div>
    );
};


function LoginPage ({handleSubmit, setEmail, setPassword}) {


    return (
        <React.Fragment>
        <div> Login Form
                <h1>Sign into your account</h1>
                <form id="login" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" onChange={setEmail} ></input>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id='password' onChange={setPassword}></input>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </React.Fragment>
    );
};


function CreateAccount ({handleSubmit,setFirstName, setLastName, setEmail, setPassword}) {

    return (
        <React.Fragment>
        <div> Create An Account
                <h1>Please Fill Out The Form</h1>
                <form id="create-account" onSubmit={handleSubmit}>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" onChange={setFirstName}></input>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" onChange={setLastName}></input>
                    <label htmlFor="email" >Email Address</label>
                    <input type="text" id="email" onChange={setEmail}></input>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id='password' onChange={setPassword}></input>
                    <button type="submit">Create</button>
                </form>
            </div>
        </React.Fragment>
    );
};


function Navbar ({loggedIn, signOut}) {


    if (loggedIn) {
    return (
        <React.Fragment>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
            <li><Link to="/dashboard/likedgames">Liked Games</Link></li>
            <li><Link to="/dashboard/interestinggames">Interests</Link></li>
            <li><Link to="/signout" onClick={signOut}>Sign Out</Link></li>
        </ul>
        <form id="search-bar">
                    <input type="text"></input>
                    <label></label>
                    <button>Search</button>
        </form>
        </React.Fragment>
    );
    } else {
        return(
            <React.Fragment>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/create">Create An Account</Link></li>
                <li><Link to="/profile">User Profile</Link></li>
            </ul>
            <form id="search-bar">
                    <input type="text"></input>
                    <label></label>
                    <button>Search</button>
            </form>
            </React.Fragment>
        );
    };
};

function SignOut() {
    return (
        <div>You have successfully signed out!</div>
    );
};


function UserDashboard ({user}) {
    return (
        <React.Fragment>
            <h1>Welcome {user.firstName}!</h1>
        </React.Fragment>
    );
};


function VideoGameDetails(){

    const [game, setGame] = React.useState('');
    const {game_id}  = ReactRouterDOM.useParams();


    React.useEffect(() => {
        fetch(`/api/games/${game_id}`)
        .then((response) => response.json())
        .then((result) => {
            setGame(result);
        });
    }, []);

    return(
        <div>
            <h1 className="video-game-title"> {game.name}</h1>
            <img src={game.cover_url} height="128" width="90"></img>
            <p> Release Date: {game.release_date}</p>
            <p> Description: {game.description}</p>
        </div>
    );
};