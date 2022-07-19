const UserModel = require("../db/models/User");
const SectionModel = require("../db/models/Section");

const { User } = require("../db");
const { Section } = require("../db");


// to be tested and wait for implementation of section shcema
const assignSection = async (req, res, next) => {
    try {
      const { userId, sectionId } = req.body;
      const user = await UserModel.findById(userId);
      const section = await SectionModel.findById(sectionId);
  
      user.sections.push(section._id);
      section.owner = user._id;
  
      await user.save();
      await section.save();
  
    } catch (error) {
      res.status(500).json({error, message: "Fail to assign user to section"});
    }
  }
  
  // to be tested and wait for implementation of section shcema
const removeSection = async (req, res, next) => {
    try {
      const { userId, sectionId } = req.body;
      const user = await UserModel.findById(userId);
      const section = await SectionModel.findById(sectionId);
  
      let updatedSections = user.sections.filter(
        (currSectionId) => {
          return String(currSectionId) !== sectionId;
        }
      );
      user.sections = updatedSections;
  
      section.owner = null;
  
      await user.save();
      await section.save();
  
    } catch (error) {
      res.status(500).json({error, message: "Fail to assign user to section"});
    }
}

const createSection = async (req, res) => {
    try {
      // re.user.admin will not work in Postman, try to figure it out
      // if (req.user.admin || req.user.superAdmin) {
      //   const { sectionName } = req.body;
      //   const newSection = new Section({ sectionName });
      //   await newSection.save();
  
      //   res.status(200).json({ message: "New section created", section: newSection });
      // } else {
      //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
      // }
      const { sectionName } = req.body;
      const newSection = new Section({ sectionName });
      await newSection.save();
  
      res.status(200).json({ message: "New section created", section: newSection });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to create section" });
    }
};
  
const deleteSection = async (req, res) => {
    try {
      // if (req.user.admin || req.user.superAdmin) {
      //   SectionModel.findByIdAndDelete(req.params.sectionid, (err) => {
      //     if (err) {
      //       console.log(err);
      //       res.status(400).json("Failed to delete section");
      //     }
      //     res.status(200).json("Successfully deleted section");
      //   });
      // } else {
      //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
      // }
      SectionModel.findByIdAndDelete(req.params.sectionid, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json("Failed to delete section");
        }
        res.status(200).json("Successfully deleted section");
      });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to delete section" });
    }
};
  
const getAllSections = async (req, res) => {
    try {
      let allSections = await SectionModel.find();
  
      // if (req.user.admin || req.user.superAdmin) {
      //   allSections = await SectionModel.find();
      // } else {
      //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
      // }
  
      res.status(200).json({
        allSections,
      });
    } catch (error) {
      res.status(500).json({ error, message: "Failed to get all sections" });
    }
};

module.exports = {
    createSection,
    deleteSection,
    getAllSections,
    assignSection,
    removeSection,
};
