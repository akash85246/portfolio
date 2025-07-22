
import "../styles/layout.css";
import React from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
function Layout({ children }) {

  return (
    <>
      <Navbar />
      <main className="main-content  flex flex-col gap-5">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;