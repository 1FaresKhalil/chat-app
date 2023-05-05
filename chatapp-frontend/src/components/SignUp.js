import React, {useState} from 'react';
import {Button, Container, Form, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../style/_signUp.scss'
import axios from "axios";

function SignUp() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [signupIssue, setSignupIssue] = useState(false);
    let navigate = useNavigate();
    let api_url_login = "http://localhost:8000/signup";

    let spinnerElem =
        <div className="spinner spinner-border loading mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>

    let issue = <p className='text-danger text-center'>Username already exists, use another one please!</p>

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignup = () => {
        axios.post(api_url_login, {name, age, username, password}).then((res) => {
            if(res.data.message === "Successful signup"){
                navigate('/signUpSuccessful');
            }else if(res.data.message === "the username already exists use another one!"){
                setSignupIssue(true);
                setSpinner(false)
            }else{
                navigate('/signUpFail');
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSpinner(true);
        handleSignup();
    };

    return (
        <div className='signup bg-light bg-opacity-75 p-2'>
            <Container fluid="md" className='px-lg-5'>
                <Row className='row p-4'>
                    <Col md="auto" sm="auto">
                        <h2 className='text-center mt-1'>SignUp</h2>
                        {signupIssue && issue}

                        <Form onSubmit={handleSubmit} className='p-4 m-2'>
                            <div className='form-fields p-1'>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={handleNameChange}
                                        onClick={()=> setSignupIssue(false)}
                                    />
                                </Form.Group>
                            </div>

                            <div className='form-fields mt-3 p-1'>
                                <Form.Group controlId="formBasicAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={age}
                                        onChange={handleAgeChange}
                                        onClick={()=> setSignupIssue(false)}
                                    />
                                </Form.Group>
                            </div>

                            <div className='form-fields mt-3 p-1'>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        onClick={()=> setSignupIssue(false)}
                                    />
                                </Form.Group>
                            </div>

                            <div className='form-fields mt-3 p-1'>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onClick={()=> setSignupIssue(false)}
                                    />
                                </Form.Group>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center'>
                                <Button className='signup-btn mt-5' type="submit">
                                    SignUp
                                </Button>
                            </div>
                            <div className='d-flex flex-row justify-content-center align-items-center'>
                                {
                                    spinner && spinnerElem
                                }
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default SignUp;