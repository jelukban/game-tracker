'use strict';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

function Homepage () {
    return (
        <div>
            <VideoGameContainer />
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


function CreateAccount ({handleSubmit,setUser}) {

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


function Navbar ({loggedIn}) {
    if (loggedIn) {
    return (
        <React.Fragment>
        <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/dashboard/likedgames">Liked Games</Link></li>
            <li><Link to="/dashboard/interestinggames">Interests</Link></li>
            <li><Link to="/signout"> Sign Out Here</Link></li>
        </ul>
        </React.Fragment>
    );
    } else {
        return(
            <React.Fragment>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/create">Create An Account</Link></li>
                <li><Link to="/profile">User Profile</Link></li>
            </ul>
            </React.Fragment>
        );
    };
};


function UserDashboard ({user}) {
    return (
        <React.Fragment>
            <h1>Welcome {user.firstName}!</h1>
        </React.Fragment>
    );
};


function App() {

    const [loggedIn, setLoggedIn] = React.useState(false)

    const [user, setUser] = React.useState({firstName: "",
                                            lastName: "",
                                            email: "",
                                            password: "" });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', { method: 'POST',
            body: JSON.stringify(user),–
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


    return (
        <ReactRouterDOM.BrowserRouter>
            <Navbar loggedIn={loggedIn}/>
            <React.Fragment>
                <ReactRouterDOM.Route exact path ='/'>
                    <Homepage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/login'>
                {loggedIn ? <ReactRouterDOM.Redirect to='/dashboard' />:
                            <LoginPage handleSubmit={handleLoginSubmit}
                                setEmail={(e) => {setUser({ ...user, email: e.target.value })}}
                                setPassword={(e) => {setUser({ ...user, password: e.target.value })}} />}
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/create'>
                    <CreateAccount handleSubmit={handleCreateSubmit} />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path='/dashboard'>
                    <UserDashboard user={user}/>
                </ReactRouterDOM.Route>
            </React.Fragment>
        </ReactRouterDOM.BrowserRouter>
    );
};


ReactDOM.render(<App />, document.querySelector('#root'));