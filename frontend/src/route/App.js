import React, {useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import HomePage from '../view/HomePage.js';
import Layout from '../view/Layout.js';
import { Routes, Route } from "react-router-dom";
import LoginPage from '../view/LoginPage.js';
import RegisterPage from '../view/RegisterPage.js';

import ESGDashBoard from '../components/ESGDashBoard.js';

function App() {
    const [account, setAccount] = useState(null); 

    return (
        <Routes>
            <Route path="/" element={<Layout account = {account}/>} >
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage account = {account} setAccount = {setAccount}/>} />
                <Route path="dashboard" element={<ESGDashBoard account = {account}/>} />
                <Route path="register" element={<RegisterPage account = {account} setAccount = {setAccount}/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}

export default App;
