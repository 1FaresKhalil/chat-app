import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../style/_signUpFail.scss'

function SignUpFail() {
    let navigate = useNavigate();
    function handleLoginClick() {
        navigate('/')
    }

    function handleSignUpClick() {
        navigate('/signUp')
    }

    return (
        <div className='signup-fail'>
            <h1> Signup Fail</h1>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <Button className='login-btn m-2' type="submit"
                        onClick={handleLoginClick}>
                    Login
                </Button>
                <Button className='signup-btn m-2' type="submit"
                        onClick={handleSignUpClick}>
                    Signup
                </Button>
            </div>
        </div>
    );
}

export default SignUpFail;