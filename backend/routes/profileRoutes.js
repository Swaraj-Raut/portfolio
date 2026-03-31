const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET profile
router.get("/", async (req,res)=>{
    const profile = await Profile.find();
    res.json(profile);
});

// ADD profile
router.get("/add", async (req,res)=>{
    const newProfile = new Profile({
        name:"Swaraj Raut",
        title:"Web Developer",
        bio:"MERN Stack Developer",
        email:"swaraj@email.com",
        phone:"1234567890",
        location:"Kolhapur"
    });

    await newProfile.save();
    res.send("Profile Added");
});

module.exports = router;