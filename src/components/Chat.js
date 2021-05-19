import {UserContext} from '../UserContext';
import React, { useState ,useContext, useEffect} from "react";
import "./css/Chat.css";
import { Avatar,IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
const io = require("socket.io-client");

function Chat(){
    
    const {user}=useContext(UserContext);
    

    // console.log("user "+user);

    const userid = localStorage.getItem('id');
    const username = localStorage.getItem('Name');
    
    const socket = io("http://localhost:8000");


    socket.on("connect", () => {
        console.log(socket.id); 
      });

    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        console.log(input);
        socket.emit('chatMessage', input);

        setInput('');
        
    }

    return(
        
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>{user.name}</h3>
                    <p>Last seen at...</p>
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
                <p className="chat__message chat__sent">
                    <span className="chat__name">Name</span>

                    This is a message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Name</span>

                    This is a message
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p> 
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat;