const Router = require("express-promise-router");

const {
    getAllProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require("../../controllers/projectController");

const router = new Router();

router.get("/", getAllProject);
router.get("/:projectId", getProjectById);
router.post("/create", createProject);
router.post("/:projectId", updateProject);
router.delete("/:projectid", deleteProject);

module.exports = router;
