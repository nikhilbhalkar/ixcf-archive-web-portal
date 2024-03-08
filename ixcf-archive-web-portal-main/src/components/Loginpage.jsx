// Login.js
import React, { useState } from 'react';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
// Import AWS SDK
const AWS = require('aws-sdk');

// Set AWS region
AWS.config.update({ region: 'eu-west-1' });

// Your code here

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [authaccessToken, setaccessToken] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const cognito = new CognitoIdentityServiceProvider();

        try {
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: '4g0f5l13lptatd9amfhm61virp',
                AuthParameters: {
                    USERNAME: username,
                    PASSWORD: password,
                },
            };

            const data = await cognito.initiateAuth(params).promise();

            // On successful authentication, redirect to the homepage with the access token
            console.log('Authentication successful:', data);

            // Redirect logic here
            let accessTokennew = data.AuthenticationResult.AccessToken;
            setaccessToken(accessTokennew);
            console.log(authaccessToken);
            navigate("/home", { state: { data: accessTokennew } });
           // window.location.href = `/home?accessToken=${accessTokennew}`; // Pass access token as query parameter
        } catch (error) {
            console.error('Authentication failed:', error);
            setErrorMessage(error.message);
        }
    };

    
   // console.log("Printing Access Token : ==========" , accessToken);
    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};




export default Login ;
