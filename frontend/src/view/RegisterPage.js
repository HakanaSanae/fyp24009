import React, {useState, useEffect} from 'react';
import RegisterForm from "../component/RegisterForm.js";
import { useNavigate } from 'react-router-dom';

function RegisterPage({ account }) { 
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
    }, [account])

    return (
        <div>
            {
                loginStatus() ? 
                (
                    <>
                        <p>Redirecting to dashboard...</p>
                        <p>If you are not redirected, click <a href="/dashboard">here</a></p>
                    </>
                    
                ) : 
                (
                    <RegisterForm />
                )
                    
            }
        </div>
    )
}

export default RegisterPage;