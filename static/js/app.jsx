'use strict';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false)

    const [user, setUser] = React.useState({firstName: "",
                                            lastName: "",
                                            email: "",
                                            password: "" });

    const [gameId, setGameId] = React.useState(0)
    const [games, setGames] = React.useState([]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.json())
        .then((result) => {if (result.has_account === 'True') {
            setUser({firstName: result.first_name,
                    lastName: result.last_name,
                    email: result.email,
                    password: result.password});
            setLoggedIn(true);
            };
        });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create', { method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((result) => {if (result.has_account === 'True') {
            setLoggedIn(true);
            };
        });
    };

    React.useEffect(() => {
        fetch('/api/games')
        .then((response) => response.json())
        .then((responseJson) => setGames(responseJson.games))
    }, []);



    return (
        <ReactRouterDOM.BrowserRouter>
            <Navbar loggedIn={loggedIn}/>
            <React.Fragment>
                <ReactRouterDOM.Route exact path ='/'>
                    <Homepage games={games}/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/login'>
                {loggedIn ? <ReactRouterDOM.Redirect to='/dashboard' />:
                            <LoginPage handleSubmit={handleLoginSubmit}
                                setEmail={(e) => {setUser({ ...user, email: e.target.value })}}
                                setPassword={(e) => {setUser({ ...user, password: e.target.value })}} />}
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/create'>
                {loggedIn ? <ReactRouterDOM.Redirect to='/dashboard' />:
                    <CreateAccount handleSubmit={handleCreateSubmit}
                                    setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
                                    setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
                                    setEmail={(e) => setUser({ ...user, email: e.target.value })}
                                    setPassword={(e) => setUser({ ...user, password: e.target.value })}/>}
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/dashboard'>
                    <UserDashboard user={user}/>
                </ReactRouterDOM.Route>
                {/* <ReactRouterDOM.Route exact path={`/games/${gameId}`}>
                    <VideoGameDetails gameId={gameId}/>
                </ReactRouterDOM.Route> */}
            </React.Fragment>
        </ReactRouterDOM.BrowserRouter>
    );
};


ReactDOM.render(<App />, document.querySelector('#root'));