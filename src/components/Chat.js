import { UserContext } from "../UserContext";
import React, { useState, useContext, useEffect } from "react";
import "./css/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Axios from "axios";


function Chat({socket}) {

  const { user } = useContext(UserContext);

  const [chatdata,setChatdata]=useState(null);
  
  
  useEffect(() => {
    
    const handler=message=>{
      console.log(message);
      
      console.log(user.chat);
      Axios.post(`http://localhost:8000/group/getchatdetails`, {
        chatid: user.chat,
      })
        .then((res) => {
          console.log(res.data);
          setChatdata(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  
    }
    socket.on('message',handler);
    return () => {
      socket.off('message', handler);
   };
  }, [user]);


  const [input, setInput] = useState("");
 
  useEffect(() => {
    if(user.chat!=null){  
      Axios.post(`http://localhost:8000/group/getchatdetails`, {
        chatid: user.chat,
      })
        .then((res) => {
          console.log(res.data);
          setChatdata(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }
  }, [user.chat]);


  const sendMessage = async (e) => {
    e.preventDefault();

    setInput("");

    await Axios.post(`http://localhost:8000/message/create`, {
      chatid: user.chat,
      sender: user.user._id,
      message: input,
      sendername: user.user.name,
    })

    let res2= await Axios.post(`http://localhost:8000/group/getchatdetails`, {
      chatid: user.chat,
    })
    setChatdata(res2.data);
  
    socket.emit("chatMessage", input);

  };

  function date(d){
    let date=new Date(d);

    return date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes();
  }

  return chatdata==null ? 
    <div className="welcome">
        <div className="start-chat">
        <h1>Start a conversation</h1>
        </div>
    </div>
    :
    (<div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>{chatdata==null ? <p></p> : chatdata.chatname}</h3>
          <p>{chatdata.userchats.length===0 ? " " : `Last seen at ${date(chatdata.userchats[chatdata.userchats.length-1].createdAt)}`}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">

        {   chatdata==null ? <p></p> :
            chatdata.userchats.map(message => (
            <p key={message._id} className={`chat__message ${ message.sender === user.user._id && 'chat__sent'}`}>
                <span className="chat__name">{user.user.name===message.sendername ? "you" :message.sendername}</span>
                {message.message}
                <span className="chat__timestamp">{date(message.createdAt)}</span>
            </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
