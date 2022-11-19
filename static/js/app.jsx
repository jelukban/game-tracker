'use strict';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

function Homepage () {
    return (
        <div>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/create">Create An Account</Link></li>
                <li><Link to="/profile">User Profile</Link></li>
            </ul>
            <VideoGameContainer />
        </div>
    );
};


function LoginPage () {

    const [user, setUser] = React.useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
        .then((response) => response.Json())
        .then((result) => setLoggedIn(result.has_account));
        };

    return (
        <React.Fragment>
        <div> Login Form
                <h1>Sign into your account</h1>
                <form id="login" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} ></input>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id='password' onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </React.Fragment>
    );
};


function CreateAccount () {

    const [user, setUser] = React.useState({firstName: "",
                                            lastName: "",
                                            email: "",
                                            password: "" });

    const [loggedIn, setLoggedIn] = React.useState(False)

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create', { method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json',
            }})
            .then((response) => response.Json())
            .then((result) => setLoggedIn(result.has_account));
    };

    return (
        <React.Fragment>
        <div> Create An Account
                <h1>Please Fill Out The Form</h1>
                <form id="create-account" onSubmit={handleSubmit}>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" onChange={(e) => setUser({ ...user, firstName: e.target.value })}></input>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" onChange={(e) => setUser({ ...user, lastName: e.target.value })}></input>
                    <label htmlFor="email" >Email Address</label>
                    <input type="text" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id='password' onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
                    <button type="submit">Create</button>
                </form>
            </div>
        </React.Fragment>
    );
};

function Navbar () {
    pass;
};

function UserProfile () {
    return (
        <React.Fragment>
            <div>User Profile
            </div>
        </React.Fragment>
    );
};


function App() {
    return (
        <ReactRouterDOM.BrowserRouter>
            <React.Fragment>
                <ReactRouterDOM.Route exact path ='/'>
                    <Homepage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/login'>
                    <LoginPage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/create'>
                    <CreateAccount />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='profile'>
                    <UserProfile />
                </ReactRouterDOM.Route>
            </React.Fragment>
        </ReactRouterDOM.BrowserRouter>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));