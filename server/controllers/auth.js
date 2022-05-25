// import user model
const UserModel = require("../db/models/User");
const ProjectModel = require("../db/models/Project");

function isAuthenticated(req, res, next) {
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

function isAdmin(req, res, next) {
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

async function isSuperAdmin(req, res, next) {
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

    res.status(200).json({ messgae: "Demoted to a regular user" });
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
    res.status(500).json({ error, message: "Fail" });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  promote,
  demote,
  approve,
};
