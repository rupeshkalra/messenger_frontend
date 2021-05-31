import React, { useContext, useState } from "react";
import "./css/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import Axios from "axios";
import { UserContext } from "../UserContext";

function Sidebar() {
  const [flip, setFlip] = useState(true);
  const { user } = useContext(UserContext);
  const username = user.user.name;
  const useremail = user.user.email;

  const [search_input,setSearch_input] =useState('');

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

  function searchchat(){
      Axios.post(`http://localhost:8000/group/searchchat`, {
        user: username,
        email: useremail,
        name:search_input
      })
        .then((res) => {
          setFlip(!flip);
          console.log(res);
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
          <input placeholder="Search a chat" type="text" value={search_input}
            onChange={(e) => setSearch_input(e.target.value)}/>
            <SearchOutlined onClick={searchchat}/>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat flip={flip} />
      </div>
    </div>
  );
}

export default Sidebar;
