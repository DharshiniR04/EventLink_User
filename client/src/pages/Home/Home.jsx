import React, { useState, useEffect } from "react";
import './Home.css';
import axios from "axios";
import Clock from "../../assets/clock_bgremoved.png";
import { useNavigate } from "react-router-dom";
import { SelectedEvent } from "../../context/EventContext";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [filteredEvent, setFilteredEvent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { setEvent } = SelectedEvent();
    const [visibleEvents, setVisibleEvents] = useState(8);
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const eventTime = new Date('2025-02-18T00:00:00').getTime();

    useEffect(() => {
        const filterEvent = () => {
            const FilteredEvent = events.filter((event) => {
                return event.category === selectedCategory
            })
            setFilteredEvent(FilteredEvent);
        }
        filterEvent();
    }, [selectedCategory]);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:5000/api/event/getallevents`);
            setEvents(response.data.event);
        }
        fetchEvent();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [eventTime]);

    const handleShowMore = () => {
        if (!showMoreClicked) {
            setVisibleEvents(events.length);
        } else {
            setVisibleEvents(8);
        }
        setShowMoreClicked(!showMoreClicked);
    };

    const handleNavigateEvent=(event)=>{
        setEvent(event);
        navigate("../event/details")
    }

    return (
        <div className="home">
            <Navbar />
            <div className="home-container">
                <div className="event-info">
                    <h4>Exceeding Event Expectations</h4>
                    <h1 className="event-title">Creating the Best.Day.Ever.</h1>
                </div>
                <div className="event-stats">
                    <div className="stat-icon">
                        <img src={Clock} className="event-stat-img" alt="Clock Icon" />
                    </div>
                    <div className="stat-details">
                        <p>Life is an Event. Make it Memorable.</p>
                        <p><strong>50+</strong> Events planned</p>
                        <p><strong>25</strong> Event managers</p>
                    </div>
                </div>
            </div>

            <div className="home-counter-wave">
                <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#ffffff" d="M0,128L60,154.7C120,181,240,235,360,245.3C480,256,600,224,720,208C840,192,960,192,1080,213.3C1200,235,1320,277,1380,298.7L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>

            <div className="home-counter">
                <h2>There are</h2>
                <div className="counter">
                    <div className="counter-item">
                        <h3>{timeLeft.days}</h3>
                        <p>days</p>
                    </div>
                    <div className="counter-item">
                        <h3>{timeLeft.hours}</h3>
                        <p>hours</p>
                    </div>
                    <div className="counter-item">
                        <h3>:</h3>
                    </div>
                    <div className="counter-item">
                        <h3>{timeLeft.minutes}</h3>
                        <p>minutes</p>
                    </div>
                    <div className="counter-item">
                        <h3>:</h3>
                    </div>
                    <div className="counter-item">
                        <h3>{timeLeft.seconds}</h3>
                        <p>seconds</p>
                    </div>
                </div>
                <h2>until showtime</h2>
            </div>
            <div className="home-counter-wave">
                <svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#ffffff" d="M0,320L60,298.7C120,277,240,235,360,213.3C480,192,600,192,720,208C840,224,960,256,1080,245.3C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            <div className="home-events-category">
                <div className="home-events-category-content">
                    <select
                        className="home-events-category-department-filter"
                        onClick={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="technical">Technical</option>
                        <option value="non-technical">Non-Technical</option>
                        <option value="workshop">Workshop</option>
                    </select>

                    <input
                        className="home-events-category-search"
                        type="text"
                        placeholder="Search events..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <header className="home-event-header">{search ? `Search results for "${search}"` : 'All Events'}</header>
                <div className="event-container">
                    {(filteredEvent && filteredEvent.length > 0 ? filteredEvent : events).slice(0, visibleEvents).map((event, index) => (
                        <div className="home-events-list" key={index}>
                            <div className="home-event-box" onClick={()=>{handleNavigateEvent(event)}}>
                                <img src={event.image} alt={event.name} className="home-event-img" />
                                <div className="home-event-description">{event.description}</div>
                                <div className="home-event-details">
                                    <h1 className="home-event-name">{event.name}</h1>
                                    <p>Time: {event.time}</p>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <p>Team Size: {event.teamsize ? event.teamsize : "N/A"}</p>
                                    {event.department && <p>Department: {event.department}</p>}
                                    <p>Admin Contact: {event.admincontact}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="home-event-category-btn" onClick={handleShowMore}>
                    {showMoreClicked ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
}

export default Home;
