import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const navigate = useNavigate()

    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

    const logout = () =>{
        window.localStorage.removeItem('token');
        navigate("/")
    }

    return (
        <div>
             <button onClick={logout}>Logout</button>
        </div>
    )
}

export default LogoutButton