import React, {useEffect, useState} from 'react';
import '../style/_conversations.scss'
import axios from "axios";

function Conversations({conversation, currentUser}) {
    const [friend, setFriend] = useState(null);
    const friend_id = conversation.members.find((m) => m !== currentUser._id);
    let token = JSON.parse(localStorage.getItem('token'));

    const getUserById = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/user/${friend_id}`,
                {headers: {"Authorization": token,}});
            setFriend(res.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserById().then(() => {
        });
    }, [conversation, currentUser])

    return (
        <div className='conversation'>
            <img
                className="conversationImg"
                src="https://cdn.acidcow.com/pics/20131001/random_cute_girls_48.jpg"
                alt=""
            />
            {
                friend ? <span className="conversationName">{friend.name}</span> : null
            }

        </div>
    );
}

export default Conversations;