import React, { useEffect, useContext, useState } from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import Axios from "axios";
import { UserContext } from "../UserContext";

function SidebarChat({flip}) {
  const [rooms, setRooms] = useState([]);
  
  const { user,setUser } = useContext(UserContext);
  
  const API = process.env.REACT_APP_BACKEND;
  
  useEffect(() => {
    Axios.post(`${API}/group/getrooms`, { email: user.user.email })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.userchats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flip]);


  return rooms.map((chatname) => {
    return (
      <div className="sidebarChat" key={chatname._id} onClick={()=>{setUser({...user,chat:chatname._id})}}>
        <div className="sidebar__component">
          <Avatar />
          <div className="sidebarChat__info">
            <h2>{chatname.name}</h2>
            {/* <p>This is the last message</p> */}
          </div>
        </div>
      </div>
    );
  });
}

export default SidebarChat;
