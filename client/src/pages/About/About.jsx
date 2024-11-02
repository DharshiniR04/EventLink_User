import React from 'react';
import './About.css'
import image from '../../assets/login.png';
import image2 from '../../assets/login.png';

function About(){
  return (
    <div className='about'>
      <div className='about-top'>
        <img src={image2} alt='about-top-img'/>
        <h2>About us</h2>
        <p>"Say goodbye to registration hassles {'->'} EventLink makes it easy and safe"</p>
      </div>
      <div className='about-bottom'>
        <div className='about-img'>
          <img src={image} alt='about-image'/>
        </div>
        <div className='about-right'>
          <div className='about-right-content'>
            <p>EventLink addresses the complexities of traditional event registration by using QR code technology and decentralization. Our platform eliminates human errors and delays, enhances security, and simplifies the verification of digital payments. We streamline the entire process, making event registration fast, accurate, and secure for both organizers and participants.
            For more information, contact us at</p>
          </div>
          <button>Contact us</button>
        </div>
      </div>
    </div>
  )
}

export default About