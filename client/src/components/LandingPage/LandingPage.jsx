import React from "react";
import { Link } from 'react-router-dom';
import imageFoods from '../../images/fondo-3.jpg';
import logo from '../../images/logoNav.png';
import './LandingPage.css';
export default function landingPage() {
    return(
        <div className="landing">
        <img src={imageFoods} alt='Landing Foods' className="lImg"/>
        <h1 className="Wc">Henry-Foods</h1>
        <h2 className="Fr">"Your right hand in the kitchen"</h2>
        <img className='logo' src={logo} alt='logo' />
        <Link to='/home'>
            <button className="btn">Entry</button>
        </Link>
    </div>
    )
}
 