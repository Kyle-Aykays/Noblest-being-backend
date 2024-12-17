const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now, // Stores the date when the report is created
        required: true
    },
    checklistType: {
        type: String,
        required: true,
        enum: ['Morning', 'LateMorning', 'Afternoon', 'Evening', 'Night']
    },
    totalTasks: {
        type: Number,
        required: true
    },
    completedTasks: {
        type: Number,
        required: true
    },
    pendingTasks: {
        type: Number,
        required: true
    },
    completionPercentage: {
        type: Number,
        required: true
    },
    priorityStats: {
        high: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        low: { type: Number, default: 0 }
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Report', ReportSchema);
