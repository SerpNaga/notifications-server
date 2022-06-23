const router = require("express").Router();
const notificationRouter = require("./notification.routes");

router.use("/notifications", notificationRouter);

module.exports = router;