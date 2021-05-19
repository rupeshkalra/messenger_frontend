import Axios from "axios";
import React, {  useState } from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import './css/Register.css'


const Register = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [error, setError] = useState('');


    const Submit = async (e) => {
        e.preventDefault();
        
        // if(error === ""){
            await Axios.post(`http://localhost:8000/users/register`, {email: inputEmail, name: inputUsername, password: inputPassword})
            .then(res => {
                
                const token = new Cookies();
                token.set('token', res.data.token, {path: '/', maxAge:604800 })
                window.location = "/";
            })
            .catch(() => setError("Email exists , try different email."));
        
    }


    return (
        <div className="container">
            <form className="margin box box-shadow text-dark" >
                <h1 className="box-title">Register to Messaging App</h1>
                <h4 className="form-error">{error}</h4>
                <div className="form-group">
                    <p className="form-label">Username:</p>
                    <input type="text" className="form-control" value={inputUsername} onChange={({target: {value}}) => setInputUsername(value)} />
                </div>
                <div className="form-group">
                    <p className="form-label">Email:</p>
                    <input type="email" className="form-control" value={inputEmail} onChange = {({target: {value}}) => setInputEmail(value)} />
                </div>
                <div className="form-group">
                    <p className="form-label">Password:</p>
                    <input type="password" className="form-control" value={inputPassword} onChange= {({target: {value}}) => setInputPassword(value)} />
                </div>
                <div className="form-group">
                    <p className = "form-label">Already have account? <NavLink to="/login" className="link">Login</NavLink></p>
                </div>
                <div className="form-group">
                    <button onClick={Submit} type="submit"  className="form-control btn btn-dark" >submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register;