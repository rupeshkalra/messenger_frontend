import React, { useState } from "react";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import {UserContext} from './UserContext';

function App () {
    const [user,setUser]=useState(null);
    
        return (
        <UserContext.Provider value={{user,setUser}}>
            <Router>
                <Switch>
                    <Route exact path = "/" component = {Home} />
                    <Route path = "/register" component = {Register} />
                    <Route path = "/login" component = {Login} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;