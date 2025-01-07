import React, {useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import HomePage from '../view/HomePage.js';
import LoginPage from '../view/LoginPage.js';
import Layout from '../view/Layout.js';
import { Routes, Route } from "react-router-dom";

function App() {
    const [account, setAccount] = useState(null); 

    return (
        <Routes>
            <Route path="/" element={<Layout account = {account}/>} >
                <Route index element={<HomePage />} />
                <Route path="loginPage" element={<LoginPage account = {account} setAccount = {setAccount}/>} />
            </Route>
        </Routes>
    )
}

export default App;
