import React, { useEffect, useState } from 'react';
import './BookedEvents.css';
import axios from 'axios';
import { SelectedUser } from '../../../context/UserContext';

function BookedEvents() {
    const [bookedEvents, setBookedEvents] = useState([]); // Unpaid events
    const [payedEvents, setPayedEvents] = useState([]); // Paid events
    const { user } = SelectedUser();

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/book/getbookedevent?email=${user.email}`);

                const departmentEvents = response.data.notPayedevents.map((data) => {
                    return data.events;
                }).flat();

                const departmentPaidEvents = response.data.payedEvents.map((data) => {
                    return data.events;
                }).flat();
                setBookedEvents(departmentEvents || []); // Set unpaid events
                setPayedEvents(departmentPaidEvents || []); // Set paid events
            } catch (err) {
                console.log(err);
            }
        };
        fetchBookedEvents();
    }, [user.email]);

    const handleDelete = async (data) => {
        try {
            const response = await axios.delete("http://localhost:5000/api/book/deletebookedevent", {
                params: {
                    email: user.email,
                    eventname: data.eventname,
                    registereddepartment: data.eventdepartment
                }
            });
            console.log(response.data.message);
            if (response.data.message === "Event deleted successfully") {
                alert("Event Deleted Successfully");
                setBookedEvents(bookedEvents.filter(event => event.eventname !== data.eventname));
                setPayedEvents(payedEvents.filter(event => event.eventname !== data.eventname));
            } else if (response.data.message === "Event Not found") {
                alert("Event Not found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='bookedevents'>
            <div className='bookedevents-list'>
                {bookedEvents.length > 0 ? (
                    <div className="bookedevents-container">
                        {bookedEvents.map((data, index) => (
                            <div className="bookedevent-card" key={index}>
                                <div className="bookedevent-ribbon">
                                    <span>Not Paid</span>
                                </div>

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
                                <div className="bookedevent-container-btn">
                                    <button className="bookedevent-btn-delete" onClick={() => handleDelete(data)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-events-message">No not paid events available</p>
                )}

                {payedEvents.length > 0 ? (
                    <div className="bookedevents-container">
                        {payedEvents.map((data, index) => (
                            <div className="bookedevent-card" key={index}>
                                 <div className="bookedevent-ribbon">
                                    <span className='paid'>Paid</span>
                                </div>
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
                    <p className="no-events-message">No paid events available</p>
                )}
            </div>
        </div>
    );
}

export default BookedEvents;
