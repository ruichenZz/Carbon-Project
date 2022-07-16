// import user model
const UserModel = require("../db/models/User");
const ProjectModel = require("../db/models/Project");

const { User } = require("../db");
const { Section } = require("../db");

const isAuthenticated = async (req, res, next) => {
  // req.isAuthenticated() is a method passed from the passport
  // authentication that we can use to check whether
  // a user is authenticated.
  try {
    if (req.isAuthenticated()) {
      console.log(req.user);

      console.log("User is authenticated");
      return next();
    }
    console.log("User is NOT authenticated");
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error, message: "Failed" });
  }
}

const checkAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    const isAdmin = user.admin || user.superAdmin;

    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const { user } = req;
    const isSuperAdmin = user.superAdmin;
    let allUsers;

    if (isSuperAdmin) {
      allUsers = await User.find();
    } else {
      allUsers = await User.find({ admin: false, superAdmin: false });
    }

    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin || req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not an admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed" });
  }
}

const isSuperAdmin = async (req, res, next) => {
  try {
    if (req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not the super admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed" });
  }
}

const promote = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id); //built in mongoose function

    user.admin = true;
    await user.save();

    res.status(200).json({ message: "Promoted to admin" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to promote" });
  }
};

const demote = async (req, res, next) => {
  //arrow function, use with react
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);

    user.admin = false;
    await user.save();

    res.status(200).json({ message: "Demoted to a regular user" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to demote" });
  }
};

const approve = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); //built in mongoose function

    project.isApproved = true;
    await project.save();

    res.status(200).json({ message: "Project has been approved" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to approve" });
  }
};

const createSection = async (req, res, next) => {
  try {
    if (req.user.admin || req.user.superAdmin) {
      const { sectionName } = req.body;
      const newSection = new Section({ sectionName });
      await newSection.save();

      res.status(200).json({ message: "New section created", section: newSection });
    } else {
      res.status(401).json({ message: "Unauthorized: you are not an admin" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to create section" });
  }
};

const deleteSection = async (req, res, next) => {
  try {
    if (req.user.admin || req.user.superAdmin) {
      Section.findByIdAndDelete(req.params.sectionid, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json("Failed to delete section");
        }
        res.status(200).json("Successfully deleted section");
      });
    } else {
      res.status(401).json({ message: "Unauthorized: you are not an admin" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to delete section" });
  }
};

const getAllSections = async (req, res, next) => {
  try {
    let allSections;

    if (req.user.admin || req.user.superAdmin) {
      allSections = await Section.find();
    } else {
      res.status(401).json({ message: "Unauthorized: you are not an admin" });
    }

    res.status(200).json({
      allSections,
    });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all sections" });
  }
};

module.exports = {
  isAuthenticated,
  checkAdmin,
  getAllUsers,
  isAdmin,
  isSuperAdmin,
  promote,
  demote,
  approve,
  createSection,
  deleteSection,
  getAllSections,
};
