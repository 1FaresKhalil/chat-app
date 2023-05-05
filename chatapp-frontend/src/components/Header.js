import React from 'react';
import '../style/_header.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faMessage} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap';


function Header() {
    let navigate = useNavigate();
    function handleLogout() {
        navigate('/')
        localStorage.clear();
    }

    return (
        <div className='header'>
            <Container>
                <Row className='p-3'>
                    <Col lg md sm={2}>
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <div className='text-white d-flex flex-row'>
                                <Link to='/chat' className='text-white text-decoration-none room'>Chat Rooms</Link> <FontAwesomeIcon icon={faMessage} className="text-light mx-2 pt-3"/>
                            </div>
                        </div>
                    </Col>
                    <Col  lg sm={8} md={6}>
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <div className='text-white'>
                                <h2>Chat App</h2>
                            </div>
                        </div>
                    </Col>
                    <Col lg md sm={2}>
                        <div className='d-flex flex-row justify-content-center align-items-center'>
                            <div className='text-white d-flex flex-row'>
                                <button className='logout text-white'
                                        onClick={handleLogout}
                                >Logout</button> <FontAwesomeIcon icon={faArrowRightToBracket} className="text-light mx-1 pt-3"/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Header;