const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "enter username please"],
    },
    text: {
        type: String,
        required: [true, "enter text please"],
    },
    date: {
        type: String,
        required: [true, "Enter date please"],
    },
    type: {
        type: String,
        required: [true, "Enter type please"],
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);