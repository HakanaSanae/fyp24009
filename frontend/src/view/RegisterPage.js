import React, {useState, useEffect} from 'react';
import RegisterForm from "../components/RegisterForm.js";
import { useNavigate } from 'react-router-dom';

function RegisterPage({account, setAccount}) { 
    const navigate = useNavigate();
    
    const loginStatus = () => {
        return (
            account ? true : false
        ) 
    }

    useEffect (() => {
        if (loginStatus()) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div>
            {
                loginStatus() ? 
                (
                    <p>Redirecting to dashboard...</p>
                ) : 
                (
                    <RegisterForm setAccount = {setAccount}/>
                )
                    
            }
        </div>
    )
}

export default RegisterPage;