import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; 

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
    <div className="overflow-x-hidden">
        <Header /> 

      <main className=""> 
        <Outlet /> 
      </main>


    </div>
    </>
  );
};

export default Layout;