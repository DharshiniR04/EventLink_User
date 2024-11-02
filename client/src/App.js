import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { EmailProvider } from './context/EmailContext';
import { EventProvider } from './context/EventContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProfileInfo from './pages/ProfileInfo/ProfileInfo';
import About from './pages/About/About';
import Landing from './pages/Landing/Landing';
import Events from './components/Events/Events';
import Profile from './pages/Profile/MainProfile/MainProfile';
import Personal from './pages/Profile/Personal/Personal';
import Password from './pages/Profile/PasswordRecover/Password';
import Details from './pages/Details/Details';

function App() {


  return (
    <UserProvider>
      <EventProvider>
        <EmailProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profileinfo" element={<ProfileInfo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/password" element={<Password />} />
              <Route path="/event" element={<Events />} />
              <Route path="/event/details" element={<Details/>} />
            </Routes>
          </Router>
        </EmailProvider>
      </EventProvider>
    </UserProvider >
  );
}

export default App;
