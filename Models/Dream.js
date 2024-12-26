const mongoose = require('mongoose');

// Schema for individual dream entries
const DreamEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true, // Date of the dream log
        default: Date.now, // Defaults to the current date
    },
    peopleInDream: {
        type: [String], // Array of names or descriptions of people in the dream
        default: [],
    },
    linkWithReality: {
        type: String, // How the dream connects to real-life events or feelings
        default: '',
    },
    timeOfDream: {
        type: String, // Time when the dream occurred (e.g., "Early morning")
        default: '',
    },
    typeOfDream: {
        type: String, // Type of the dream (e.g., "Lucid", "Nightmare", "Normal")
        enum: ['Lucid', 'Nightmare', 'Normal', 'Recurring', 'Unknown'],
        default: 'Unknown',
    },
    overallTheme: {
        type: String, // Theme or narrative of the dream (e.g., "Adventure", "Conflict")
        default: '',
    },
    feelingOnWakeUp: {
        type: String, // How the user felt upon waking up from the dream
        default: '',
    },
    mainEmotionInDream: {
        type: String, // The primary emotion experienced in the dream (e.g., "Fear", "Joy")
        default: '',
    },
    thoughtsInDream: {
        type: String, // Key thoughts or actions taken in the dream
        default: '',
    },
    meaningOfDream: {
        type: String, // User's interpretation of what the dream might mean
        default: '',
    },
    describeInOneWord: {
        type: String, // One word summary of the dream (e.g., "Terrifying", "Inspiring")
        default: '',
    },
    symbolsOrMetaphors: {
        type: [String], // Array of symbols or metaphors present in the dream
        default: [],
    },
    sleepingPosition: {
        type: String, // Sleeping position during the dream
        enum: ['Back', 'Side', 'Stomach', 'Unknown'],
        default: 'Unknown',
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Schema for user dreams
const DreamSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Each dream log belongs to a user
        unique: true,
    },
    dreamEntries: [DreamEntrySchema],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


module.exports = mongoose.model('Dream', DreamSchema);
