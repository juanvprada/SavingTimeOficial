import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import IconCreate from '../components/IconCreate';
import Footer from '../components/Footer.jsx';


const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <IconCreate /> 
            <Footer />
        </>
    );
};

export default Layout;

