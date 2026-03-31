const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title:String,
    description:String,
    technologies:[String],
    githubUrl:String,
    liveUrl:String,
    image:String
});

module.exports = mongoose.model("Project", ProjectSchema);