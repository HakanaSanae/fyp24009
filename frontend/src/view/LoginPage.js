import React, {useState} from 'react';
import ESGDashBoard from "../components/ESGDashBoard.js";
import RegisterForm from "../components/RegisterForm.js";

function LoginPage({account, setAccount}) { 
    const loginStatus = () => {
        return (
            account ? true : false
        ) 
    }

    return (
        <div>
            {
                loginStatus() ? 
                (
                    <ESGDashBoard account = {account} />
                ) : 
                (
                    <RegisterForm setAccount = {setAccount}/>
                )
                    
            }
        </div>
    )
}

export default LoginPage;