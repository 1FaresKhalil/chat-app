import React from 'react';
import '../style/_header.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faMessage} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";


function Header() {
    let navigate = useNavigate();
    function handleLogout() {
        navigate('/')
        localStorage.clear();
    }

    return (
        <div className='header d-flex flex-row justify-content-evenly'>

            <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className='text-white d-flex flex-row'>
                    <Link to='/chat' className='text-white text-decoration-none room'>Chat Rooms</Link> <FontAwesomeIcon icon={faMessage} className="text-light mx-2 pt-lg-2"/>
                </div>
            </div>


            <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className='text-white'>
                    <h2>Chat App</h2>
                </div>
            </div>

            <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className='text-white d-flex flex-row'>
                    <button className='logout text-white'
                            onClick={handleLogout}
                    >Logout</button> <FontAwesomeIcon icon={faArrowRightToBracket} className="text-light mx-1 pt-lg-2"/>
                </div>
            </div>


        </div>
    );
}

export default Header;