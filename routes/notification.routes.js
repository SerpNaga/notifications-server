const router = require("express").Router();


const {
    addNotification,
    removeNotification,
    getOneNotification,
    getNotification,
    editNotification
} = require("../controllers/notification.controller");


router.get("/:id", getOneNotification);
router.post("/", addNotification);
router.put("/:id", editNotification);
router.delete("/:id", removeNotification);
router.get("/", getNotification);

module.exports = router;