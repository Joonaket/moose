import React, { useState } from 'react';
import "./pages.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {paikallinenIP} from "./VAIHDATÄMÄ";

const videoURL = 'https://dl.dropboxusercontent.com/scl/fi/b8b0g14nqd150lq7jhfsv/forestvideo2.mp4?rlkey=c9ytiz1wbk64244gb4gvmjl3x&dl=0';

const Login = ({setLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const tempIP = paikallinenIP;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Make a request to your backend login endpoint

            console.log("Trying login on adress:",tempIP)
            const response = await axios.post(tempIP+"/login", {
                username,
                password,
            });

            if (response.data.success) {
                // Successful login
                // You may want to store user data in state or context for global access
                setLoggedIn(true)
                //console.log("Login successful:", response.data.user);


                // Redirect to the home page or any other route after successful login
                navigate("/");
            } else {
                console.error("Login failed:", response.data.message);
                // Handle login failure (show error message, etc.)
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            // Handle other errors (network issues, server errors, etc.)
        }
    };

    return (
        <div className={"container"}>
            <div className={"contentBack"}>
                <video src={videoURL} autoPlay loop muted/>
            </div>

            <div className={"contentFront"}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br/>
                    <button type="submit">Login</button>
                </form>

            </div>
        </div>
    );
};

export default Login;
