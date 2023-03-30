import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    let token;
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/eshop/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
          });
            let resJson = await res.json();
            token = resJson
            window.localStorage.setItem("token",JSON.stringify(token.token))
            setUsername("")
            setPassword("")
            if (res.status === 200) {
                navigate('/home');
            } else {
                alert("Error")
            }
            } catch (err) {
            console.log(err);
            }
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    <input type="text" value={username} onChange={handleUsername}/>
                </label>
                <label>
                    <input type="password" value={password} onChange={handlePassword}/>
                </label>
                <button onClick={handleLogin}>Login</button>
            </form>
            <Link to="/">Do not have an account?Sign up here</Link>
        </div>
    )
}

export default Login