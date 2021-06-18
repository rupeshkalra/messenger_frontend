import React,{useContext} from 'react';
import '../App.css';
import './css/Home.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { UserContext } from "../UserContext";
const io = require("socket.io-client");
const API = process.env.REACT_APP_BACKEND;
  
function Home({history}) {
  const socket = io(API);
  socket.on("connect", () => {
    console.log(socket.id);
  });

  const {user}=useContext(UserContext);
  
  return user.user==null ? 
  <div className="login-redirect">
    <div className="content">
      <h1>Login Please</h1>
    </div><br/><br/>
    <button onClick={()=>{history.push('/login')}}>Login</button>
  </div>
   :
        (<div className="app">
          <div className="app__body"> 
            <Sidebar />
            <Chat socket={socket} />
          </div>
        </div>
        )
}
  

export default Home;
