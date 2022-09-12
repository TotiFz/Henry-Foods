import React from "react";
import { Link } from 'react-router-dom';
import logoNav from '../../images/logoNav.png';
import './NavBar.css';

export default function NavBar () {
    return (
        <div className="navBar">
            <div > 
                <Link to='/'>
                    <img className="logo-png" src={logoNav} alt='logo'/>
                </Link>
            </div>
            <nav>
                <ul className="ulNav">
                    <li className="liNav">
                        <Link to='/home'>Home</Link>
                        <Link to='/create'>Create Recipes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}