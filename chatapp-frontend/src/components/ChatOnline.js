import React, {useEffect, useState} from 'react';
import '../style/ChatOnline.css'
import axios from "axios";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    let token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`http://localhost:8000/users`,
                {headers: {"Authorization": token,}});
            setFriends(res.data.users);
        };
        getFriends().then(()=>{});
    }, []);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => {
            return onlineUsers.find((u) => u.userId === f._id);
        }));
    }, [friends, onlineUsers]);


    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/conversation/find/${currentId}/${user._id}`,
                {headers: {"Authorization": token,}}
            );
            setCurrentChat(res.data.result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='chatOnline'>
            {onlineFriends.map((o) => (
                <div className='chatOnlineFriend' key={o._id} onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src="https://i.pinimg.com/originals/52/b2/aa/52b2aaf2ac84b40b384dddb36efbb65a.jpg"
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.name}</span>
                </div>

            ))
            }

        </div>
    );
}

export default ChatOnline;