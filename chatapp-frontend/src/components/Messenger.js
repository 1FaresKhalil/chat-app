import React, {useEffect, useRef, useState} from 'react';
import Header from "./Header";
import '../style/_messanger.scss';
import Conversations from "./Conversations";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import axios from "axios";
import {io} from "socket.io-client";

function Messenger() {
    const scrollRef = useRef();
    const socket = useRef();
    const [user, setUser] = useState({});
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    let token = JSON.parse(localStorage.getItem('token'));

    // get profile to know which user server deal with
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

    // get conversations of user login know to view in chat menu
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


    // make useEffect to reset style of chat page
    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.display = 'block';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.display = '';
        };
    }, [])

    // get message of current chat
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

    // move the scroller to the end of current chat
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    console.log(user)
    // side effects for socket io
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                users
            );
        });
    }, [user])

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });
        try {
            await axios.post("http://localhost:8000/message", message,
                {headers: {"Authorization": token,}});
            setMessages([...messages, message]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    // const makeConversation = async ()=>{
    //
    // }

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
                                            <div ref={scrollRef} key={m._id}>
                                                <Message message={m} own={m.sender === user._id}/>
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
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Messenger;