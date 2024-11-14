import React, { Children } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
   useEffect(()=>{
    if(!token){
        navigate("/login")
    } 
    if(!admin)
    {
        navigate("/")
    }
   })

    return <>{children}</>
};

export default PrivateRoute;