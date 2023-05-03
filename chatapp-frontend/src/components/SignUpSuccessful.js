import React from 'react';
import {Button} from "react-bootstrap";
import '../style/_signUpSuccessful.scss'
import {useNavigate} from "react-router-dom";

function SignUpSuccessful() {
    let navigate = useNavigate();
    function handleClick() {
        navigate('/')
    }

    return (
        <div className='successful-signup'>
            <h1>Successful Signup</h1>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <Button className='login-btn mt-4' type="submit"
                onClick={handleClick}>
                    Login
                </Button>
            </div>
        </div>
    );
}

export default SignUpSuccessful;