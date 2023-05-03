import React from 'react';
import '../style/_message.scss';
import {format} from "timeago.js";

function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
                <img
                    className="messageImg"
                    src="https://cdn.acidcow.com/pics/20131001/random_cute_girls_48.jpg"
                    alt=""
                />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}

export default Message;