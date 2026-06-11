const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Task", TaskSchema);