import React from 'react';
import { Outlet, Link } from 'react-router-dom'; 
import Nav from '../Nav'; // Ensure Nav is correctly defined

const MainLayout = () => {
    return (
        <div>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/user">User Management</Link>
                <Link to="/create">Create Product</Link>
                <Link to={`/edit/:id`}>Edit Product</Link> 
                <Link to="/login">Login</Link>
            </nav>
            <Nav/>
            <Outlet /> 
        </div>
    );
};

export default MainLayout;


