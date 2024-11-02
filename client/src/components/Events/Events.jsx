import React, { useState, useEffect } from 'react';
import './Events.css';
import axios from 'axios';
import { SelectedEvent } from '../../context/EventContext';
import { FaArrowLeft } from 'react-icons/fa';

function Events() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const { eventSelect } = SelectedEvent();
    const departments = ["All", "CSE", "IT", "ECE", "EEE", "AI/DS", "CIVIL", "MECH"];

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {

        }
    };

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:5000/api/event/getevents?event=${eventSelect}`);
            console.log(response.data);
            setEvents(response.data.event);
        }
        fetchEvent();
    }, [])

    const handleBack = () => {
        window.history.back();
    };


    const filteredEvents = events.filter(event =>
        (selectedDepartment === "All" || event.department.includes(selectedDepartment)) &&
        (event.name.toLowerCase().includes(search.toLowerCase()) ||
            event.category.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase()))
    );

    const categorizedEvents = filteredEvents;

    const renderEvents = () =>
        categorizedEvents.length > 0 ? (
            categorizedEvents.map((event, index) => (
                <div className="events-list">
                    <div className="event-box" key={index}>
                        <img src={event.image} alt={event.name} className="event-img" />
                        <div className="event-description">{event.description}</div>
                        <div className="event-details">
                            <h1 className="event-name">{event.name}</h1>
                            <p>Time: {event.time}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Team Size: {event.teamsize ? event.teamsize : "N/A"}</p>
                            {event.department && <p>Department: {event.department}</p>}
                            <p>Admin Contact: {event.admincontact}</p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div>No events found in this category.</div>
        );

    return (
        <>
            <div className="event-content">
                <div className="event-personal-actions">
                    <FaArrowLeft className="back-arrow" onClick={handleBack} />
                </div>
                <select
                    className="event-department-filter"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>

                <input
                    className="event-search"
                    type="text"
                    placeholder="Search events..."
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                />
            </div>

            <div className="event-container">
                <header>{eventSelect} Events</header>
                &nbsp;
                <div className="event-section">{renderEvents()}</div>
            </div>
        </>
    );
}

export default Events;
