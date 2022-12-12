import React from "react";

function CreateAccount ({handleSubmit,setFirstName, setLastName, setEmail, setPassword}) {

    return (
        <React.Fragment>
        <div> Create An Account!
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
                <div> Password needs to be more than 8 characters! </div>
            </div>
        </React.Fragment>
    );
};

export default CreateAccount;