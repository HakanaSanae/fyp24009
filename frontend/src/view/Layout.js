import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavigation from '../component/TopNavigation';

function Layout({ account }) {
  return (
    <div className="layout">
      <header>
        <nav>
           <TopNavigation account = { account }/> 
        </nav>
      </header>
      <main>
        <Outlet />
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </main>
      <footer>
        <p>© 2025 ESGenius</p>
      </footer>
    </div>
  );
}

export default Layout;