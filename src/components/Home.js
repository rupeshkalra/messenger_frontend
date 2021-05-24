import React,{useContext} from 'react';
import '../App.css';
import './css/Home.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { UserContext } from "../UserContext";

function Home({history}) {
  
  const {user,setUser}=useContext(UserContext);
  
  return user==null ? 
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
            <Chat />
          </div>
        </div>
        )
}
  

export default Home;
