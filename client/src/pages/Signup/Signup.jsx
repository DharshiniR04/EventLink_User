import React, { useState } from "react";
import './Signup.css';
import Modal from '../../components/Modal/Modal';
import Image from '../../assets/signup_lap.jpg';
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";
import { SelectedEmail } from "../../context/EmailContext";

function Signup() {
    const navi = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const {email, setEmail } = SelectedEmail();
    const [otp, setOtp] = useState(""); 
    const [isOtpSent, setIsOtpSent] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setModalMessage("Generating OTP");
        setIsModalOpen(true);
        const data = {
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        };
        try {
            const response = await axios.post("https://event-link-user-server.vercel.app/api/auth/signup", {
                name: data.name,
                email: data.email,
                password: data.password
            });
            if (response.data.message === "User already exists") {
                setModalMessage("User already exists");
                setIsModalOpen(true);
            } else if (response.data.otpSent) {
                setIsModalOpen(false);
                setEmail(data.email);
                setIsOtpSent(true); 
            }
        } catch (err) {
            setModalMessage("An error occurred during signup.");
            setIsModalOpen(true);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
  
            const response = await axios.post("https://event-link-user-server.vercel.app/api/auth/verify-otp", {
                email: email,
                otp: otp
            });
            if (response.data.message === "OTP verified successfully") {
                navi('../profileinfo'); 
            } else {
                setModalMessage("Invalid OTP");
                setIsModalOpen(true);
            }
        } catch (err) {
            console.error(err); 
            setModalMessage("An error occurred during OTP verification.");
            setIsModalOpen(true);
          }
          
    };

    const closeModal = () => {
        setModalMessage('');
        setIsModalOpen(false);
    };

    return (
        <div className="signup">
            <div className="signup-img">
                <div className="overlay"></div>
                <div className="signup-text">
                    <h1>One of us?</h1>
                    <p>If you already have an account, sign in, we've missed you!</p>
                    <button onClick={() => { navi('../login') }}>Sign in</button>
                </div>
                <img src={Image} alt="signup-img" />
            </div>
            <div className="signup-content">
                <FaArrowLeft className="back-arrow" onClick={() => { window.history.back()}} />
                <h2 className="signup-content-head">Time to feel like home,</h2>
                
                {!isOtpSent ? (
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <div className="input-container">
                                <input type="text" id="name" name="name" className="solid-input" placeholder="Name" required />
                            </div>
                            <div className="input-container">
                                <input type="email" id="email" name="email" className="solid-input" placeholder="Email" required />
                            </div>
                            <div className="input-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" 
                                    className="solid-input" 
                                    placeholder="Password"
                                    required 
                                />
                                <span className="signup-password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                                <button className="signup-btn" type="submit">Signup</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="form-group">
                            <div className="input-container">
                                <input 
                                    type="text" 
                                    id="otp" 
                                    name="otp" 
                                    className="solid-input" 
                                    placeholder="Enter OTP" 
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required 
                                />
                            </div>
                            <button className="signup-btn" type="submit">Submit OTP</button>
                        </div>
                    </form>
                )}
            </div>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />} 
        </div>
    );
}

export default Signup;
