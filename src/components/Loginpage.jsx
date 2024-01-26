import React from "react";
import { useState } from "react";
import '../components/loginpage.css'
import Homepage from "./Homepage";
import { useNavigate } from 'react-router-dom'

function Loginpage() {
  const [inputUsernameValue, setinputUsernameValue] = useState('');
  const [inputPasswordValue, setinputPasswordValue] = useState('');
  const navigate = useNavigate();

  const usernamehandleInputChange = (e) => {
    setinputUsernameValue(e.target.value);
  };

  const passwordhandleInputChange = (e) => {
    setinputPasswordValue(e.target.value);
  };

  const handleAuthentication = (e) => {
    let auth = "succ"
    e.preventDefault();
    if(auth === "succ"){
      console.log(inputUsernameValue, inputPasswordValue);
      navigate("/home")
    }
    else{
      navigate("/login")
    }
    //renderHomepage();
  };

;
  return (
    <div className="loginpage">
      <div class="login-page">
        <div class="form">
        
          <form class="login-form" onSubmit={handleAuthentication}>
            <input type="text" placeholder="username" value={inputUsernameValue} onChange={usernamehandleInputChange} />
            <input type="password" placeholder="password" value={inputPasswordValue} onChange={passwordhandleInputChange} />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;