const Users = require('../models/users')
const bcrypt=require('bcrypt');
const path = require('path');
const {sendWelcomeEmail,sendPasswordRecoveryEmail} =require('../services/emailService');
const {generateUsername}=require('../services/generateUsername');

const otps = {}; 

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (user) {
            return res.json({ message: 'User already exists' });
        }
        const username=await generateUsername(name,email);
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.insertMany({ name, username, email, password: hashedPassword });

        const imagePath = path.join(__dirname, '../assets/login.png');
        const otp = Math.floor(1000 + Math.random() * 9000);  
        otps[email] = otp;  
  
        await sendWelcomeEmail(name, email, 'EventLink', `Your OTP is: ${otp}`, imagePath);
       
        res.json({ message: 'OTP sent successfully', otpSent: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (otps[email] && otps[email] == otp) {
            delete otps[email];  
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(200).json({ message: 'Invalid OTP' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const login=async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({ message: 'User does not exist' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const passwordRecovery=async(req,res)=>{
    const {email}=req.query;
    try{
        await sendPasswordRecoveryEmail(email);
        res.status(200).json({message:"Recovery mail sent"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassage:'Server Error'});
    }
}



module.exports={login, signup, verifyOtp,passwordRecovery};