import React, { useEffect, useState } from 'react';
import './PayedEvents.css';
import axios from 'axios';
import { SelectedUser } from '../../../context/UserContext';

function PayedEvents() {
    const [bookedEvents, setBookedEvents] = useState([]);
    const { user } = SelectedUser();

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/payment/getpayedevent?email=${user.email}`);
                const departmentEvents = response.data.events.map((data) => {
                    return data.events;
                  }).flat();
                setBookedEvents(departmentEvents || []);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchBookedEvents();
    }, [user.email]);

    return (
        <div className='bookedevents'>
            <div className='bookedevents-list'>
                {bookedEvents.length > 0 ? (
                    <div className="bookedevents-container">
                        {bookedEvents.map((data, index) => (
                            <div className="bookedevent-card" key={index}>
                                <p className="bookedevent-details"><strong>Event Name:</strong> {data.eventname}</p>
                                <p className="bookedevent-details"><strong>Category:</strong> {data.category}</p>
                                <p className="bookedevent-details"><strong>Location:</strong> {data.eventlocation}</p>
                                <p className="bookedevent-details"><strong>Department:</strong> {data.eventdepartment}</p>
                                <p className="bookedevent-details"><strong>Time:</strong> {data.eventtime}</p>
                                <p className="bookedevent-details"><strong>Date:</strong> {new Date(data.eventdate).toLocaleDateString()}</p>
                                <p className="bookedevent-details"><strong>Team Size:</strong> {data.eventteamsize}</p>
                                <p className="bookedevent-teammembers"><strong>Team Members:</strong></p>
                                <ul>
                                    {data.teammembers && data.teammembers.length > 0 ? (
                                        data.teammembers.map((member, memberIndex) => (
                                            <li key={memberIndex} className="bookedevent-details">
                                                {member.name} - {member.email}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="bookedevent-details">Solo</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-events-message">No planned events available</p>
                )}
            </div>
        </div>
    );
}

export default PayedEvents;
