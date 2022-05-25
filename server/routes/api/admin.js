const Router = require("express-promise-router");
const { User } = require("../../db");
const { promote, demote, isAdmin, approve } = require("../../controllers/auth");

const router = new Router();

router.get("/is_admin", async (req, res, next) => {
  try {
    const { user } = req;
    const isAdmin = user.admin || user.superAdmin;

    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/users", async (req, res, next) => {
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
});

router.post("/promote", isAdmin, promote);
router.post("/demote", isAdmin, demote);

router.post("/approve", isAdmin, approve);

module.exports = router;
