import React, { useEffect, useContext, useState } from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import Axios from "axios";
import { UserContext } from "../UserContext";

function SidebarChat({flip}) {
  const [rooms, setRooms] = useState([]);


  const { user } = useContext(UserContext);
  
  function chatclick(_id){
    
  }
  useEffect(() => {
    Axios.post(`http://localhost:8000/group/getrooms`, { email: user.email })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.userchats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flip]);

  // console.log(rooms);

  return rooms.map((chatname) => {
    return (
      <div className="sidebarChat" key={chatname._id} onClick={chatclick(chatname._id)}>
        <div className="sidebar__component">
          <Avatar />
          <div className="sidebarChat__info">
            <h2>{chatname.name}</h2>
            <p>This is the last message</p>
          </div>
        </div>
      </div>
    );
  });
}

export default SidebarChat;
