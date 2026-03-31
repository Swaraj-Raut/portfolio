const express = require("express");
const router = express.Router();
const multer = require("multer");

const Project = require("../models/Project");


// multer storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage: storage });


// ADD PROJECT
router.post("/add", upload.single("image"), async (req, res) => {

  const project = new Project({

    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    status: req.body.status,
    image: req.file.filename

  });

  await project.save();

  res.json("Project Added");

});


// GET PROJECTS
router.get("/", async (req, res) => {

  const projects = await Project.find();

  res.json(projects);

});


// DELETE PROJECT
router.delete("/:id", async (req, res) => {

  await Project.findByIdAndDelete(req.params.id);

  res.json("Project Deleted");

});


module.exports = router;