import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegisterForm from './components/RegisterForm.js';
import TopNavigation from './components/TopNavigation.js';
import HomePage from './view/HomePage.js';
import Highlights from './components/Highlights.js';

class App extends React.Component {
    render() {
        return (
            <div className="mainClass">
                <TopNavigation/>
                <HomePage />
                <Highlights />
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        )
    }
}

export default App;
