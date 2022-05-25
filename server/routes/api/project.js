const Router = require("express-promise-router");
const { Project } = require("../../db");
const { User } = require("../../db");
const mongoose = require("mongoose");

const router = new Router();

const handleError = (res) => {
  res.status(400).json({ "message": "bad" });
}



// GET all the projects that the user has created.
router.get('/', async (req, res, next) => {
  let userId = req.user["_id"];
  try {
    User.findById(userId).populate("projectsCreated")
      .then(user => res.status(200).send(user.projectsCreated))
  } catch(err) {
    console.log(err)
    res.status(400).json({success: false, message:err.message});
  }
})



// GET a specific project through its projectid
router.get('/:projectid', async(req, res, next) => {
  let projectId = req.params.projectid;
  Project.findById(projectId, (err, project) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error retrieving project data")
    }
    res.status(200).send(project)
  })
})



// CREATE a project
router.post('/create', async(req, res, next) => {
  let userId = req.user["_id"];
  User.findById(userId, async (err, user) => {
    try {
      // Save the project into the Project collection.
      let {name} = req.body;
      let project = new Project({
        name,
        createdBy : userId
      })
      project.save(err => {
        if (err) { 
          console.log(err)
          res.status(400).send("Error creating project");
          return;
        }
      })

      // Append the project into the user's projectCreated field.
      user.projectsCreated.push(project);
      user.save(err => {
        if (err) {
          console.log(err)
          res.status(400).send("Error appending Project to user");
          return;
        }
        res.status(200).json({
          message: "Success",
          project
        })
      });
    } catch (err) {
      handleError(res);
    }
  })
})



// UPDATE project, currently this API is called only for updating its content
router.put('/:projectid', async (req, res, next) => {
  let projectId = req.params.projectid;
  let updatedContents = req.body
  Project.findByIdAndUpdate(projectId, {content : updatedContents}, (err, project) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error adding components!")
    } else {
      res.status(200).send(`Successfully Added components!`)
    }
  })
})



// DELETE project
router.delete("/:projectid", async(req, res, next) => {
  let userId = req.user["_id"];
  let projectId = req.params.projectid;
  try {
    // Delete project from the projectsCreated field from the User collection.
    User.findById(userId, (err, user) => {
      let updatedProjectsCreated = user.projectsCreated.filter(currProjectId => {
        return String(currProjectId) !== projectId
      });
      user.projectsCreated = updatedProjectsCreated;
      user.save(err => {
        if (err) {
          console.log(err)
          res.status(400).send("Error deleting project from User, try again")
        }

          // Delete the project from the Project collection
          Project.findByIdAndDelete(projectId, (err) => {
            if (err) {
              console.log(err);
              res.status(400).send("Error deleting project, try again later");
            }
            res.status(200).send("Successfully deleted Project!")
          })
      })
    })


  } catch(err) {
    handleError(res)
  }
})

module.exports = router