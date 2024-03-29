import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import "../style/_messanger.scss";
import "../style/_spinner.scss";
import Conversations from "./Conversations";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import axios from "axios";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./slices/userSlice";
import Spinner from "./Spinner";
import UnAuthenticated from "./UnAuthenticated";

function Messenger() {
  const scrollRef = useRef();
  const socket = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  let token = JSON.parse(localStorage.getItem("token"));

  console.log(conversations);

  // get profile to know which user server deal with
  let user = useSelector((state) => state.user.user);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  // side effects for socket io
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      // if (Notification.permission === "granted") {
      //     new Notification("New Message", {
      //         body: data,
      //         icon: "https://cloud.mongodb.com/static/images/sadface.gif",
      //     });
      // }
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // useEffect(() => {
  //     if (Notification.permission !== "granted") {
  //         Notification.requestPermission();
  //     }
  // }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user._id) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user]);

  // get conversations of user login know to view in chat menu
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/conversation/${user._id}`,
          { headers: { Authorization: token } }
        );
        setConversations(res.data.result);
      } catch (e) {
        console.log(e);
      }
    };
    if (user) {
      getConversations().then(() => {});
    }
  }, [user._id]);

  // make useEffect to reset style of chat page
  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.display = "block";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.display = "";
    };
  }, []);

  // get message of current chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/message/${currentChat?._id}`,
          { headers: { Authorization: token } }
        );
        setMessages(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages().then(() => {});
  }, [currentChat]);

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
      if (newMessage !== "") {
        await axios.post("http://localhost:8000/message", message, {
          headers: { Authorization: token },
        });
        setMessages([...messages, message]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // move the scroller to the end of current chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //
  // function handleNewMessage(message) {
  //     if (Notification.permission === "granted") {
  //         new Notification("New Message", {
  //             body: message,
  //             icon: "path/to/icon.png",
  //         });
  //     }
  // }
  // // your Socket.io code here, assuming you're emitting a "new message" event:
  // socket.on("new message", handleNewMessage);

  if (localStorage.getItem("token") === null) {
    return <UnAuthenticated />;
  }

  if (localStorage.getItem("token") !== null) {
    return (
      <div>
        <Header />
        <div className="messenger d-flex">
          <div className="chatMenu">
            <div id="chatMenuWrapper" className="chatMenuWrapper  p-5 h-100">
              <input
                placeholder="Search for people"
                className="chatMenuInput"
              />

              {conversations.length === 0 ? (
                <Spinner />
              ) : (
                conversations.map((conv) => (
                  <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                    <Conversations conversation={conv} currentUser={user} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="chatBox">
            <div id="chatBoxWrapper" className="chatBoxWrapper p-5 h-100">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>

                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open conversation to start a chat
                </span>
              )}
            </div>
          </div>

          <div className="chatOnline">
            <div className="chatOnlineWrapper p-5 h-100">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
                conversations={conversations}
                setConversations={setConversations}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messenger;
