import React, {useState} from 'react';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import '../style/_login.scss'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginIssue, setLoginIssue] = useState(false);
    let navigate = useNavigate();
    let api_url_login = "http://localhost:8000/login";

    let issue = <p className='text-danger text-center'>Invalid username or password!</p>

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const Enter = () => {
        axios.post(api_url_login, {username, password}).then((res) => {
            if (res.data.result.token) {
                localStorage.setItem('token', JSON.stringify(res.data.result.token));
                navigate('/home',{replace:true});
            }
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                setLoginIssue(true);
                setUsername("");
                setPassword("");
            }else{
                setLoginIssue(true);
                setUsername("");
                setPassword("");
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Enter();
    };

    function handleSignUp() {
        navigate('/signUp');
    }

    return (
        <div className='login d-flex flex-row justify-content-center align-items-center'>
            <Container>
                <Row className='row'>
                    <Col
                        className='left p-5 d-flex flex-column justify-content-center align-items-center bg-light bg-opacity-50'>
                        <h2 className='text-center'>Login Please</h2>
                        <Link to='/signUp' className='text-black pt-2'>Don't have account?</Link>
                        <Button className='signup-btn mt-3' type="submit"
                                onClick={handleSignUp}>
                            Signup
                        </Button>
                    </Col>

                    <Col
                        className='right p-5 d-flex flex-row justify-content-evenly align-items-center bg-light bg-opacity-50'>
                        <Form onSubmit={handleSubmit} className='p-4'>
                            {loginIssue && issue}
                            <div className='form-fields'>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        onClick={() => {
                                            setLoginIssue(false);
                                        }
                                        }
                                    />
                                </Form.Group>
                            </div>

                            <div className='form-fields mt-4'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onClick={() => {
                                            setLoginIssue(false);
                                        }
                                        }
                                    />
                                </Form.Group>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center'>
                                <Button className='login-btn mt-4' type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>


        </div>
    );
}

export default Login;