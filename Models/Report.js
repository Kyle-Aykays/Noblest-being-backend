const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    checklistType: {
        type: String,
        required: true,
        enum: ['Morning', 'LateMorning', 'Afternoon', 'Evening', 'Night']
    },
    totalTasks: { type: Number, required: true },
    completedTasks: { type: Number, required: true },
    pendingTasks: { type: Number, required: true },
    completionPercentage: { type: Number, required: true },
    priorityStats: {
        high: {
            total: { type: Number, default: 0 },
            completed: { type: Number, default: 0 },
        },
        medium: {
            total: { type: Number, default: 0 },
            completed: { type: Number, default: 0 },
        },
        low: {
            total: { type: Number, default: 0 },
            completed: { type: Number, default: 0 },
        },
    },
});

const ReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reports: [dailyReportSchema],
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
