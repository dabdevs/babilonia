const router = require("express").Router();
const passport = require("passport");

// Controllers
const { register, login, logout } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/secure",
    failureRedirect: "/auth/failure",
  })
);



// failure
router.get("/failure", (req, res) => {
  res.send("Authentication failed!");
});

module.exports = router;
