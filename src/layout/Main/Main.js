import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/pages/shared/Footer/Footer';
import Navbar from '../../components/pages/shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;