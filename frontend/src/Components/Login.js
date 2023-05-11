import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
            alert('Please fill both the fields');
        }
        try {
            let response;
            response = await fetch('http://localhost:9000/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            });
            if (!response) {
                alert("Unable to login, Something went wrong");
            }
            else {
                alert("Logged in sucessfully!");
                setEmail('');
                setPassword('');
                navigate('/add-blog');
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="loginContainer">
            <div className="loginFormContainer">
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="lEmail">Email address</label>
                        <input value={email} onChange={handleEmail} type="email" className="form-control" id="emailIdID" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lPassword">Password</label>
                        <input value={password} onChange={handlePassword} type="password" className="form-control" id="passwordID" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;