import React, { useState } from "react";
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password == '') {
            alert('Please fill all the input fields');
        }
        try {
            let response;
            response = await fetch('http://localhost:9000/register-user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName, lastName, email, password
                })
            })
            if (!response) {
                alert("Unable to register the user");
            }
            else {
                alert("User registered sucessfully");
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="registerContainer">
            <div className="registerFormContainer">
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="lfirstName">First Name</label>
                        <input onChange={handleFirstName} value={firstName} type="text" className="form-control" id="firstNameId" aria-describedby="emailHelp" placeholder="Enter First Name " />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lLastName">Last Name</label>
                        <input onChange={handleLastName} value={lastName} type="text" className="form-control" id="lastNameId" aria-describedby="emailHelp" placeholder="Enter Last Name " />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lEmail">Email address</label>
                        <input onChange={handleEmail} value={email} type="email" className="form-control" id="emailIdId" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lPassword">Password</label>
                        <input onChange={handlePassword} value={password} type="password" className="form-control" id="passwordId" placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;