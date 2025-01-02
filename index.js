const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductsRouter = require('./Routes/ProductsRouter');
const profileRoutes = require('./Routes/ProfileRouter');
const checklistRoutes = require('./Routes/ChecklistRouter')
const ActivityRoutes = require('./Routes/ActivityRouter')
const ReportRoutes = require('./Routes/ReportRouter');
const SleepRoutes = require('./Routes/SleepRouter');
const DreamRoutes = require('./Routes/DreamRouter');
const MoodRouter = require('./Routes/MoodRouter')
const session = require('express-session');

const passport = require('./config/passport'); // Import Passport config
require('dotenv').config();
require('./config/db');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware setup
app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow credentials (e.g., cookies)
}));app.use('/auth', AuthRouter);
app.use('/mood', MoodRouter);
app.use('/products', ProductsRouter);
app.use('/profile', profileRoutes);
app.use('/checklist', checklistRoutes);
app.use('/activity', ActivityRoutes );
app.use('/report', ReportRoutes );
app.use('/sleep', SleepRoutes);
app.use('/dream', DreamRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
const {rescheduleMissedTasks, resetCompletedTasks,generateAndSaveReportforcron} = require("./Controllers/ChecklistController")
app.post('/manual-cron', async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find();  // Assuming you have a User model to fetch users
        console.log("These are the users",users)
        // Iterate over all users and reschedule missed tasks for each user
        for (const user of users) {
            // Call the reschedule function for all checklist types (Morning, LateMorning, etc.)
            // await generateAndSaveReportforcron(user._id, "Morning");
            // await generateAndSaveReportforcron(user._id, "LateMorning");
            // await generateAndSaveReportforcron(user._id, "Afternoon");
            // await generateAndSaveReportforcron(user._id, "Evening");
            // await generateAndSaveReportforcron(user._id, "Night");
            await rescheduleMissedTasks(user._id, 'Morning');
            await rescheduleMissedTasks(user._id, 'LateMorning');
            await rescheduleMissedTasks(user._id, 'Afternoon');
            await rescheduleMissedTasks(user._id, 'Evening');
            await rescheduleMissedTasks(user._id, 'Night');
            await resetCompletedTasks(user._id);
            console.log(`Tasks rescheduled and refreshed for user ${user._id}`);
        }

        
        console.log('Cron job completed: Missed high-priority tasks have been rescheduled.');

    } catch (err) {
        console.error('Error in cron job for rescheduling missed tasks:', err);
    }
});

app.post('/manual-report', async (req, res) => {

    console.log('Running daily report generation at 8:30 AM...');
    const users = await User.find({});
    for (const user of users) {
        try {
            // Generate and save reports for the Morning checklist
            // await generateAndSaveReport(user._id, 'Morning');
        } catch (err) {
            console.error(`Error generating report for user ${user._id}:`, err);
        }
    }
    console.log('Daily report generation completed.');
    });


const cron = require('node-cron');
const User = require('./Models/User')
const report = require('./Models/Report')
// Schedule rescheduling tasks at midnight for Morning checklist
cron.schedule('59 23 * * *', async () => { 
    try {
        // Fetch all users
        const users = await User.find();  // Assuming you have a User model to fetch users
        console.log("These are the users",users)
        // Iterate over all users and reschedule missed tasks for each user
        for (const user of users) {
            // Call the reschedule function for all checklist types (Morning, LateMorning, etc.)
            await rescheduleMissedTasks(user._id, 'Morning');
            await rescheduleMissedTasks(user._id, 'LateMorning');
            await rescheduleMissedTasks(user._id, 'Afternoon');
            await rescheduleMissedTasks(user._id, 'Evening');
            await rescheduleMissedTasks(user._id, 'Night');
            await resetCompletedTasks(user._id);
                console.log(`Tasks rescheduled and refreshed for user ${user._id}`);
        }

        console.log('Cron job completed: Missed high-priority tasks have been rescheduled.');

    } catch (err) {
        console.error('Error in cron job for rescheduling missed tasks:', err);
    }
});

cron.schedule('30 8 * * *', async () => {
    console.log('Running daily report generation at 8:30 AM...');
    const users = await User.find({});
    for (const user of users) {
        try {
            // Generate and save reports for the Morning checklist
            // await generateAndSaveReport(user._id, 'Morning');
        } catch (err) {
            console.error(`Error generating report for user ${user._id}:`, err);
        }
    }
    console.log('Daily report generation completed.');
});


