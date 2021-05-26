import React, { useContext, useState } from "react";
import "./css/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined, SentimentSatisfiedAltSharp } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import Axios from "axios";
import { UserContext } from "../UserContext";

function Sidebar() {
  const [flip, setFlip] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const username = user.user.name;
  const useremail = user.user.email;

  function create() {
    const roomname = prompt("Please Enter Name for Chat");

    Axios.post(`http://localhost:8000/group/create`, {
      user: username,
      name: roomname,
      email: useremail,
    })
      .then((res) => {
        console.log(res);
        setFlip(!flip);
      })
      .catch(() => alert("Try different name"));
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__name">
          <h3>{username}</h3>
        </div>
        <div className="sidebar__headerRight">
          <IconButton onClick={create}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat flip={flip} />
      </div>
    </div>
  );
}

export default Sidebar;
