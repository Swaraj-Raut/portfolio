const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");


// ADD SKILL
router.post("/add", async (req, res) => {

  const skill = new Skill(req.body);

  await skill.save();

  res.json("Skill Added");

});


// GET ALL SKILLS
router.get("/", async (req, res) => {

  const skills = await Skill.find();

  res.json(skills);

});


// DELETE SKILL
router.delete("/:id", async (req, res) => {

  await Skill.findByIdAndDelete(req.params.id);

  res.json("Skill Deleted");

});


// UPDATE SKILL
router.put("/:id", async (req, res) => {

  await Skill.findByIdAndUpdate(req.params.id, req.body);

  res.json("Skill Updated");

});

module.exports = router;