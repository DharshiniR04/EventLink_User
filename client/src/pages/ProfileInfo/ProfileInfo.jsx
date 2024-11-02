import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { SelectedEmail } from "../../context/EmailContext";
import './ProfileInfo.css';
import axios from "axios";
import ProfileInfoBack from '../../assets/profileinfo.jpeg';
import ProfileAddPick from '../../assets/addprofilepic.webp';
import Modal from '../../components/Modal/Modal';

function ProfileInfo() {
    const navi = useNavigate();
    const { email } = SelectedEmail();
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const maxSizeMB = 2;
        const maxSizeBytes = 100000;

        if (file) {
            if (file.size > maxSizeBytes) {
                setModalMessage(`Your file size is ${file.size} bytes. File size exceeds the ${maxSizeMB}MB limit. Please upload a smaller file.`);
                setIsModalOpen(true);
                return;
            }

            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImage(reader.result);
                };
            } catch (error) {
                console.error("Image processing failed:", error);
            }
        }
    };

    const handleProfile = async (event) => {
        event.preventDefault();
        const data = {
            department: event.target.elements.department.value,
            college: event.target.elements.college.value,
            mobile: event.target.elements.mobile.value,
        };

        console.log(data);

        try {
            const response = await axios.patch("http://localhost:5000/api/user/userdetail", {
                email: email,
                profile: image,
                department: data.department,
                college: data.college,
                mobile: data.mobile
            });
            setModalMessage("User created successfully");
            setIsModalOpen(true);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        if (modalMessage === "User created successfully") {
            navi('../login');
        }
    };

    return (
        <>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
            <div className="profileinfo">
                <div className="profileinfo-img">
                    <div className="overlay"></div>
                    <img src={ProfileInfoBack} alt="signup-img" />
                </div>
                <div className="profileinfo-content">
                    <FaArrowLeft className="back-arrow" onClick={() => { navi('../signup') }} />
                    <form onSubmit={handleProfile}>
                        <div className="form-group">
                            <label htmlFor="profile-image-upload" className="image-upload-label">
                                <div
                                    className="profile-image-upload"
                                    style={{ backgroundImage: `url(${image || ProfileAddPick})` }}
                                />
                            </label>
                            <input
                                type="file"
                                id="profile-image-upload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <div className="input-container">
                                <input type="text" id="department" name="department" className="solid-input" placeholder="Department" required />
                            </div>
                            <div className="input-container">
                                <input type="text" id="college" name="college" className="solid-input" placeholder="College" required />
                            </div>
                            <div className="input-container">
                                <input type="tel" id="mobile" name="mobile" className="solid-input" placeholder="Mobile Number" required />
                            </div>
                            <button className="signup-btn" type="submit">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;
