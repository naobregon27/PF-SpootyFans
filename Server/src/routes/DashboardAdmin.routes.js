const dashboardAdminRouter = require("express").Router();
const verifyEmail = require("../controllers/dashboardAdmin/verifyEmail");

dashboardAdminRouter.post("/verifyemail", async (req, res) => {
  const { email } = req.body;
  const verificationCode = await verifyEmail(email);

  if (verificationCode.error) {
    return res.status(400).json({ error: verificationCode.error });
  } else {
    return res.status(200).json(verificationCode);
  }
});

module.exports = dashboardAdminRouter;
