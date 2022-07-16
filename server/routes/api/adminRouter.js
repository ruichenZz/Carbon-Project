const Router = require("express-promise-router");

const { 
  checkAdmin, 
  getAllUsers,
  isAdmin,
  promote, 
  demote, 
  approve, 
  getAllSections
} = require("../../controllers/adminController");

const router = new Router();

router.get("/is_admin", checkAdmin);

router.get("/users", getAllUsers);

router.post("/promote", isAdmin, promote);
router.post("/demote", isAdmin, demote);
router.post("/approve", isAdmin, approve);

router.get("/sections", getAllSections);

module.exports = router;
