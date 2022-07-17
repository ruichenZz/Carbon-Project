const Router = require("express-promise-router");

const { 
  checkAdmin, 
  getAllUsers,
  isAdmin,
  isSuperAdmin,
  promote, 
  demote, 
  approve, 
  deny,
} = require("../../controllers/adminController");

const router = new Router();

router.get("/is_admin", checkAdmin);

router.get("/users", getAllUsers);

router.post("/promote", isAdmin, promote);
router.post("/demote", isSuperAdmin, demote);
router.post("/approve", isAdmin, approve);
router.post("/deny", isAdmin, deny);

module.exports = router;
