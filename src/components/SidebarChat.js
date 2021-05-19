import React, { useEffect, useState } from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import Axios from "axios";

function SidebarChat(){
    const [rooms,setRooms]=useState([]);
    const useremail = localStorage.getItem('email');

    useEffect(()=>{
            
        console.log(useremail);
        Axios.post(`http://localhost:8000/group/getrooms`,{email:useremail})
        .then(res=>{
            console.log(res);
            setRooms(res);
            console.log(rooms);
        })
        .catch(err=>{console.log(err)});

    },[]);

    return <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
            <h2>Name</h2>
            <p>This is the last message</p>
        </div>
    </div>;
}

export default SidebarChat;