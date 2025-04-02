import React, {useEffect, useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MainPage from '../view/MainPage.js';
import Layout from '../view/Layout.js';
import { Routes, Route } from "react-router-dom";
import LoginPage from '../view/LoginPage.js';
import RegisterPage from '../view/RegisterPage.js';
import ESGDashBoard from '../component/ESGDashBoard.js';
import HomePage from '../view/HomePage.js';

function App() {
    const acc = localStorage.getItem('account');
    const [account, setAccount] = useState(acc); 

    return (
        <Routes>
            <Route path="/" element={<Layout account = {account} setAccount = {setAccount}/>} >
                <Route index element={<MainPage /> } />
                <Route path="login" element={<LoginPage account = {account} setAccount = {setAccount}/>} />
                <Route path="dashboard" element={<HomePage /> }>
                    <Route path="Overall-ESG-Performance" element={<ESGDashBoard account = {account} setAccount = {setAccount}/>} />
                    <Route path="Sector-based-Comparison" element={<h1>Sector based comparison</h1>} />
                    <Route path="Top-Bottom-Performers" element={<h1>Top bottom performers</h1>} />
                    <Route path="ESG-Score-Breakdown" element={<h1>ESG Score breakdown</h1>} />
                    <Route path="Sector-Industry-Leaders" element={<h1>ESG Sector industry leaders</h1>} />
                </Route>
                <Route path="register" element={<RegisterPage account = {account} setAccount = {setAccount}/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}

export default App;
