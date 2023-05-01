import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    let api_url_login = "http://localhost:8000/login";

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const Enter = ()=>{
        axios.post(api_url_login, {username,password}).then((res)=>{
            localStorage.setItem('token', JSON.stringify(res.data.result.token));
            if (res.data.result.token){
                navigate('/chat');
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Enter();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Button variant="danger" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;