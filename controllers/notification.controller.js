const NotificationModel = require("../models/notification.model");
const { StatusCodes } = require("http-status-codes");

const addNotification = async (req, res) => {
    const { user, text, ndate, ntype} = req.headers;
    let newNotification = await NotificationModel.create({user, text, date:ndate, type:ntype });
    console.log(`add ${user} ${text} ${ndate} ${ntype}`)
    res.status(StatusCodes.CREATED).send({id:newNotification._id});
};
const editNotification = async (req, res) => {
    const { user, text, ndate, ntype} = req.headers;
    const { id } = req.params;
    let editNotification = await NotificationModel.updateOne({_id:id}, {user, text, date:ndate, type:ntype });
    console.log(`edit ${id} ${user} ${text} ${ndate} ${ntype}`)
    res.status(StatusCodes.OK).send("Success");
};

const removeNotification = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send("Please enter id");
        return;
    }
    await NotificationModel.deleteOne({ _id: id });
    console.log(`remove ${id}`)
    res.status(StatusCodes.OK).send("Success");
};

const getOneNotification = async (req, res) => {
    const { id } = req.params;
    console.log(`get ${id}`)
    if (!id) {
        res.send("Please enter id");
        return;
    }
    const notification = await NotificationModel.findOne({ _id: id });
    if (!notification) {
        res.send("Notification not found");
        return;
    }
    res.status(StatusCodes.OK).json({ notification });
};

const getNotification = async (req, res) => {
    console.log("get all")
    const notifications = await NotificationModel.find({});
    res.send(notifications);
};

module.exports = { addNotification, removeNotification, editNotification, getOneNotification, getNotification };