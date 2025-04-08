import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MainPage from '../view/MainPage.js';
import Layout from '../view/Layout.js';
import { Routes, Route , Navigate } from "react-router-dom";
import LoginPage from '../view/LoginPage.js';
import RegisterPage from '../view/RegisterPage.js';
import ESGDashBoard from '../component/ESGDashBoard.js';
import HomePage from '../view/HomePage.js';
import RiskAnalysisPage from '../view/RiskAnalysisPage.js';
import AccountPage from '../view/AccountPage.js';
import { useLocation } from 'react-router'

function App() {

    const location = useLocation();
    const [account, setAccount] = useState(localStorage.getItem('account'));

    useEffect(() => {
        const acc = localStorage.getItem('account');
        if (acc !== account) {
            setAccount(acc);
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Layout account={account} />} >
                <Route index element={<MainPage />} />
                <Route path="login" element={ account ? <Navigate to='/dashboard' replace/> : <LoginPage />} />
                <Route path="register" element={ account ? <Navigate to='/dashboard' replace/> : <RegisterPage /> } />
                <Route path="account" element={ account ? <AccountPage setAccount={setAccount}/> : <Navigate to='/login' replace />} />
                <Route path="dashboard" element={ account ? <DashboardRoutes account={account} /> : <Navigate to="/login" replace />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}

function DashboardRoutes({ account }) {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="Overall-ESG-Performance" element={<ESGDashBoard account={account} />} />
            <Route path="Sector-based-Comparison" element={<h1>Sector based comparison</h1>} />
            <Route path="Top-Bottom-Performers" element={<h1>Top bottom performers</h1>} />
            <Route path="ESG-Score-Breakdown" element={<h1>ESG Score breakdown</h1>} />
            <Route path="Sector-Industry-Leaders" element={<h1>ESG Sector industry leaders</h1>} />
            <Route path="ESG-Risk-Analysis" element={<RiskAnalysisPage />} />
        </Routes>
    );
}

export default App;
