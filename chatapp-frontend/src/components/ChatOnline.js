import React, {useEffect, useState} from 'react';
import '../style/_chatOnline.scss';
import axios from "axios";

function ChatOnline({ onlineUsers, currentId, setCurrentChat,conversations, setConversations }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    let token = JSON.parse(localStorage.getItem('token'));

    let new_online_users = onlineUsers.filter((u)=> u.userId !== currentId);

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
            return new_online_users.find((u) => u.userId === f._id);
        }));
    }, [friends, onlineUsers]);

    const makeConversation = async (sender,receiver)=>{
        const new_conversation = {
            senderId:sender,
            receiverId:receiver
        }
        try {
            const res = await axios.post(`http://localhost:8000/conversation`,new_conversation,
                {headers: {"Authorization": token,}});
            setConversations([...conversations ,new_conversation]);
        } catch (e) {
            console.log(e);
        }
    }


    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/conversation/find/${currentId}/${user._id}`,
                {headers: {"Authorization": token,}}
            );
            if(res.result === "no conversation"){
                await makeConversation(currentId,user._id);
            }else{
                setCurrentChat(res.data.result);
            }
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