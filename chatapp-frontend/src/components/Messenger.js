import React, {useEffect, useRef, useState} from 'react';
import Header from "./Header";
import '../style/Messenger.css'
import Conversations from "./Conversations";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import axios from "axios";

function Messenger() {
    const scrollRef = useRef();
    const [user, setUser] = useState({});
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState("");
    const [newMessage, setNewMessage] = useState("");
    let token = JSON.parse(localStorage.getItem('token'));
    console.log(messages)

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/profile", {headers: {"Authorization": token,}}
                );
                setUser(res.data.user);
            } catch (e) {
                console.log(e);
            }
        };
        getProfile().then(() => {
        });
    }, []);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/conversation/${user._id}`,
                    {headers: {"Authorization": token,}});
                setConversations(res.data.result);
            } catch (e) {
                console.log(e);
            }
        }
        if (user) {
            getConversations().then(() => {
            });
        }
    }, [user._id]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/message/${currentChat?._id}`,
                    {headers: {"Authorization": token,}});
                setMessages(res.data.result)
            } catch (err) {
                console.log(err);
            }
        };
        getMessages().then(() => {
        });
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        try {
            const res = await axios.post("http://localhost:8000/message",message,
                {headers: {"Authorization": token,}});
            setMessages([...messages, message]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <Header/>
            <div className='messenger d-flex'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper p-5 h-100'>
                        <input placeholder='Search for people' className='chatMenuInput'/>
                        {
                            conversations.map((conv) =>
                                <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                    <Conversations conversation={conv}
                                                   currentUser={user}
                                    />
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper p-5 h-100'>
                        {
                            currentChat ? (
                                <>
                                    <div className='chatBoxTop'>
                                        {messages.map((m) => (
                                            <div ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='chatBoxBottom'>
                            <textarea className="chatMessageInput"
                                      placeholder="write something..."
                                      onChange={(e) => setNewMessage(e.target.value)}
                                      value={newMessage}
                            ></textarea>
                                        <button className="chatSubmitButton"
                                                onClick={handleSubmit}>
                                            Send
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <span className="noConversationText">Open conversation to start a chat</span>
                            )
                        }

                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper p-5 h-100'>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messenger;