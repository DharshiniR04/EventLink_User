import React from "react";
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Logo from '../../assets/main_logo.png';

function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <div id="section1">
                <h1 className="gradient-text">Connect, Participate, Enjoy</h1>
                <p className="ptag">Participate, connect, and enjoy a seamless event experience like never before!</p>
                <div>
                    <button 
                        className="landing-btn" 
                        onClick={() => navigate('../signup')}
                        aria-label="Get Started"
                    >
                        Get Started
                    </button>
                </div>
            </div>
            <div id="section2">
                <p className="ptag">Expand Your Exposure!</p>
                <h1 className="landing-word">
                    It all starts with a single step. Join our symposium and make connections.
                </h1>
                <p className="ptag">
                    Engage, collaborate, and broaden your horizons as you network with like-minded individuals!
                </p>
            </div>
            <div id="section3">
                <footer className="footer">
                    <div className="footer-column">
                        <div className="footer-icon">
                            <img src={Logo} alt="link icon" />
                        </div>
                        <p>Built in NEC.</p>
                    </div>
           
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <p onClick={()=>{navigate('../about')}}>About</p>
                        <p>Our Team</p>
                    </div>
                    <div className="footer-column">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <i className="fa fa-instagram"></i>
                            <i className="fa fa-youtube"></i>
                            <i className="fa fa-linkedin"></i>
                        </div>
                    </div>
                </footer>
                <div className="footer-bottom">
                    <p>© 2024 EventLink. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Landing;
