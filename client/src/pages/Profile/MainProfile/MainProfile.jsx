import React, { useState } from 'react';
import './MainProfile.css';
import Personal from '../Personal/Personal';
import Navbar from '../../../components/Navbar/Navbar';
import Password from '../PasswordRecover/Password';
import BookedEvents from '../BookedEvents/BookedEvents';
import Payment from '../Payment/Payment';
import PayedEvents from '../PayedEvents/PayedEVents';
import QRPage from '../QR/QR';


function Profile() {
    const [activeSection, setActiveSection] = useState("Personal Information");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <ul>
                            <li
                                className={activeSection === "Personal Information" ? "active" : ""}
                                onClick={() => handleSectionChange("Personal Information")}
                            >
                                Personal Information
                            </li>
                            <li
                                className={activeSection === "Events" ? "active" : ""}
                                onClick={() => handleSectionChange("Events")}
                            >
                                Booked Events
                            </li>
                            <li
                                className={activeSection === "Payment" ? "active" : ""}
                                onClick={() => handleSectionChange("Payment")}
                            >
                                Payment
                            </li>
                            <li
                                className={activeSection === "QR Codes" ? "active" : ""}
                                onClick={() => handleSectionChange("QR Codes")}
                            >
                                QR codes
                            </li>
                            <li
                                className={activeSection === "Password Change" ? "active" : ""}
                                onClick={() => handleSectionChange("Password Change")}
                            >
                                Password Change
                            </li>
                        </ul>
                    </div>

                    <div className="profile-content">
                        {activeSection === "Personal Information" && (
                            <div className="content-section">
                                <Personal />
                            </div>
                        )}

                        {activeSection === "Password Change" && (
                            <div className="content-section">
                                <Password />
                            </div>
                        )}

                        {activeSection === "Payment" && (
                            <div className="content-section">
                                 <Payment/>
                            </div>
                        )}

                        {activeSection === "Events" && (
                            <div className="content-section">
                                <BookedEvents />
                            </div>
                        )}
                        {activeSection === "QR Codes" && (
                            <div className="content-section">
                                  <QRPage/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
