import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Details.css';
import axios from 'axios';
import { SelectedEvent } from '../../context/EventContext';
import { SelectedUser } from '../../context/UserContext';

function Details() {
    const { eventSelect } = SelectedEvent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [members, setMembers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [status, setStatus] = useState(false); 
    const { user } = SelectedUser();
    const navigate = useNavigate();

    const handleBookClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...members];
        if (typeof newMembers[index] !== 'object') {
            newMembers[index] = { name: '', email: '' };
        }
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const handleBookDetail = async () => {
        const data = {
            name: eventSelect.teamsize===1?userName:user.name,
            registereddepartment:eventSelect.department,
            email: eventSelect.teamsize===1?userEmail:user.email,
            college: user.college,
            image: user.profile,
            events: {
                eventname: eventSelect.name,
                category: eventSelect.category,
                eventlocation: eventSelect.location,
                eventdepartment: eventSelect.department,
                eventtime: eventSelect.time,
                eventdate: eventSelect.date,
                eventteamsize: eventSelect.teamsize,
                teammembers: members
            }
        };

        try {
            const response = await axios.post("https://event-link-user-server.vercel.app/api/book/bookevent", { data });
            console.log(response);
            if (response.data.message === "Users does not exist") {
                alert(`Users with emails ${response.data.emails} do not exist`);
            }
            else if (response.data.message === "Already Booked") {
                setStatus(true); 
                alert("Already Booked");
                closeModal(); 
            } 
            else if (response.data.message === "Event booked successfully") {
                setStatus(true); 
                alert("Event booked successfully. Complete the payment in the profile section to secure attendance.");
                closeModal(); 
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while booking the event. Please try again.");
        }
    };

    const renderTeamInputs = () => {
        const memberInputs = [];
        for (let i = 1; i <= eventSelect.teamsize; i++) {
            memberInputs.push(
                <div className='teamdetail' key={i}>
                    <div className="team-member">
                        <div className="team-member-input">
                            <label>Member {i} Name:</label>
                            <input
                                type="text"
                                value={members[i - 1]?.name || ''}
                                onChange={(e) => handleMemberChange(i - 1, 'name', e.target.value)}
                                placeholder={`Enter Member ${i} Name`}
                            />
                        </div>
                        <div className="team-member-input">
                            <label>Member {i} Email:</label>
                            <input
                                type="email"
                                value={members[i - 1]?.email || ''}
                                onChange={(e) => handleMemberChange(i - 1, 'email', e.target.value)}
                                placeholder={`Enter Member ${i} Email`}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return memberInputs;
    };

    return (
        <>
            <div
                className='event-detail-back'
                style={{
                    backgroundImage: `url(${eventSelect.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="event-detail-container">
                    <div className="box event-detail-image">
                        <img src={eventSelect.image} alt={eventSelect.name} />
                    </div>
                    <div className="event-detail-details">
                        <div>
                            <h1 className="event-detail-title">{eventSelect.name}</h1>
                            <p className="event-detail-description">Description: {eventSelect.description}</p>
                            <p className="event-detail-category">Category: {eventSelect.category}</p>
                            <p className="event-detail-location">Location: {eventSelect.location}</p>
                            <p className="event-detail-time">Time: {eventSelect.time}</p>
                            <p className="event-detail-date">Date: {new Date(eventSelect.date).toDateString()}</p>
                            <p className="event-detail-teamsize">Max Team Size: {eventSelect.teamsize}</p>
                        </div>
                        <div className="event-detail-contact">
                            <img src={eventSelect.adminprofile} alt='img' />
                            <p>Host: {eventSelect.adminname}</p>
                            <p>Contact: {eventSelect.admincontact}</p>
                            <p>Email: {eventSelect.adminemail}</p>
                        </div>
                        <button className="event-detail-button" onClick={handleBookClick}>
                            {status === true? 'Booked' : 'Book'}
                        </button>
                        {status === true && (
                            <p className="detail-to-profile">
                                Navigate to <span onClick={() => navigate("../profile")} className="detail-to-profile-span">Profile</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="eventdetail-modal-overlay">
                    <div className="eventdetail-modal-content">
                        <span className="eventdetail-close" onClick={closeModal}>&times;</span>
                        <h2>Register for {eventSelect.name}</h2>
                        {eventSelect.teamsize === 1 ? (
                            <div>
                                <label className="eventdetail-label">Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="eventdetail-input"
                                />
                                <label className="eventdetail-label">Email:</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="eventdetail-input"
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="eventdetail-label">Team Name:</label>
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Enter team name"
                                    className="eventdetail-input"
                                />
                                {renderTeamInputs()}
                            </div>
                        )}
                        <button className="eventdetail-submit-btn" onClick={handleBookDetail}>Submit</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Details;
