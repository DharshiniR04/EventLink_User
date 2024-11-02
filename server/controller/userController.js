const Users = require('../models/users');

const updateUserDetail = async (req, res) => {
    const { name, profile, username } = req.body;
    const user = Users.findOne(username);
    if (user) {
        await Users.updateOne({ username: username }, { $set: { profile: profile, name: name } });
        const updatedUser = await Users.findOne({ username });
        return res.status(200).json({ message: "Updated successfully", data: updatedUser });
    }
}

const deleteUser=async(req,res)=>{
    const {username}=req.body;
    await Users.deleteOne({username:username});
    res.status(200).json({message: "Deleted successfully"})
}

const fetchuser=async(req,res)=>{
    const {email}=req.body;
    try{
        const response=await Users.findOne({email:email});
        res.json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const userdetail=async(req,res)=>{
    const {email,profile,department,college,mobile}=req.body;
    try{
        await Users.updateOne( { email: email }, { $set: { profile:profile,department:department,college:college,mobile:mobile } } );
        res.json("Updated Successfully") 
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}




module.exports = { updateUserDetail ,deleteUser,fetchuser,userdetail};