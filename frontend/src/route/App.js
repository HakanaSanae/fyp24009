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
                <Route path="dashboard/*" element={ account ? <DashboardRoutes /> : <Navigate to="/login" replace />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}

function DashboardRoutes() {
    const dashboardRoutes = [
        { path: "YOY-ESG-Change", element: <ESGDashBoard /> },
        { path: "Sector-Wise-ESG-Performance", element: <ESGDashBoard /> },
        { path: "ESG-Score-Breakdown", element: <ESGDashBoard /> },
        { path: "ESG-Score-Distribution", element: <ESGDashBoard /> },
        { path: "Custom-Comparison", element: <ESGDashBoard /> },
        { path: "Overall-ESG-Performance", element: <ESGDashBoard /> },
    ];

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="ESG-Risk-Analysis" element={<RiskAnalysisPage />} />
            {
                dashboardRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))
            }
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default App;
