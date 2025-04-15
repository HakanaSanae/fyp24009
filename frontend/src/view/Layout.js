import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import TopNavigation from '../component/TopNavigation';
import TopNavigationSidebar from '../component/TopNavigationSidebar';

function Layout({ account }) {

  const [isBarOpen, setIsBarOpen] = useState(false); 

  return (
    <div className="layout">
      <header>
        <nav>
           <TopNavigation account = { account } isBarOpen = { isBarOpen } setIsBarOpen = { setIsBarOpen }/> 
           <TopNavigationSidebar account = { account } isBarOpen = { isBarOpen } setIsBarOpen = {  setIsBarOpen }/>
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