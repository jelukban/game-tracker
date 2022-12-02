import React from "react";

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

export default LoginPage;