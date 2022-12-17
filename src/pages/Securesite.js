import React from 'react'
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';


const Securesite = ({children}) => {
    const [cookies, setCookie] = useCookies(["name"]);
    const token=cookies.Token
    if(!token){
        return <Navigate to="/Userauthentication"/>
    }
    
  return children
}

export default Securesite
