import React from 'react';
import '../style/ChatOnline.css'

function ChatOnline(props) {
    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src= "https://i.pinimg.com/originals/52/b2/aa/52b2aaf2ac84b40b384dddb36efbb65a.jpg"
                        alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Rewan Magdy</span>

            </div>

        </div>
    );
}

export default ChatOnline;