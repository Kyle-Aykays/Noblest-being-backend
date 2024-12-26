const Activity = require('../Models/Activity');
const Sleep = require('../Models/Sleep');

// Create a new sleep record
const createSleepRecord = async (req, res) => {
    try {
        const {
            userId, sleepTime, wakeupTime, sleepQuality, totalHours,
            numberOfAwakenings, reasonForAwakenings, feelingsUponWaking,
            timeToFallAsleep, reasonForFallingAsleepDelay, alertnessUponWaking,
            deepSleepHours, daytimeSleepiness, sleepingPosition, windDownActivity,
            totalSteps, totalWater, preSleepActivity, totalExerciseMinutes,
            bedtimeMedicine, totalMeditationMinutes
        } = req.body;

        if (!userId || !sleepTime || !wakeupTime) {
            return res.status(400).json({
                message: 'User, sleepTime, and wakeupTime are required',
                success: false,
            });
        }

        let sleepDocument = await Sleep.findOne({ userId: userId });
        let date = Date.now();
        if (!sleepDocument) {
            sleepDocument = new Sleep({
                userId: userId,
                sleepEntries: [{ date, sleepTime, wakeupTime, sleepQuality, totalHours,numberOfAwakenings, reasonForAwakenings, feelingsUponWaking,
                    timeToFallAsleep, reasonForFallingAsleepDelay, alertnessUponWaking,
                    deepSleepHours, daytimeSleepiness, sleepingPosition, windDownActivity,
                    totalSteps, totalWater, preSleepActivity, totalExerciseMinutes,
                    bedtimeMedicine, totalMeditationMinutes }],
            });
        } else {
            sleepDocument.sleepEntries.push({ date, sleepTime, wakeupTime, sleepQuality, totalHours,numberOfAwakenings, reasonForAwakenings, feelingsUponWaking,
                timeToFallAsleep, reasonForFallingAsleepDelay, alertnessUponWaking,
                deepSleepHours, daytimeSleepiness, sleepingPosition, windDownActivity,
                totalSteps, totalWater, preSleepActivity, totalExerciseMinutes,
                bedtimeMedicine, totalMeditationMinutes });
        }

        await sleepDocument.save();

        res.status(201).json({
            success: true,
            message: 'Sleep entry added successfully',
            data: sleepDocument,
        });
    } catch (error) {
        console.error('Error adding sleep entry:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

// Get sleep records by user and date range
const getSleepRecords = async (req, res) => {
    try {
        const { userId, date } = req.body;

        if (!userId || !date) {
            return res.status(400).json({
                success: false,
                message: 'User ID and date are required',
            });
        }

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        // Fetch the sleep document
        const sleepDocument = await Sleep.findOne({ userId });

        if (!sleepDocument) {
            return res.status(404).json({
                success: false,
                message: 'No sleep data found for the user',
            });
        }

        // Filter entries matching the normalized date
        const entriesForDate = sleepDocument.sleepEntries.filter((entry) => {
            const entryDate = new Date(entry.date);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === normalizedDate.getTime();
        });

        if (entriesForDate.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No sleep records found for the specified date',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sleep entries retrieved successfully',
            data: entriesForDate,
        });
    } catch (error) {
        console.error('Error fetching sleep entries by date:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


// Update a sleep record
// Update a sleep record
const updateSleepRecord = async (req, res) => {
    try {
        const { sleepId, userId, ...updates } = req.body;

        if (!sleepId || !userId) {
            return res.status(400).json({
                message: 'User ID and Sleep ID are required',
                success: false,
            });
        }

        // Locate and update the specific sleep entry
        const updatedDocument = await Sleep.findOneAndUpdate(
            { userId, "sleepEntries._id": sleepId }, // Match the user and specific sleep entry
            {
                $set: {
                    "sleepEntries.$.date": updates.date, // Ensure date is properly updated
                    "sleepEntries.$.sleepTime": updates.sleepTime,
                    "sleepEntries.$.wakeupTime": updates.wakeupTime,
                    "sleepEntries.$.sleepQuality": updates.sleepQuality,
                    "sleepEntries.$.totalHours": updates.totalHours,
                    "sleepEntries.$.numberOfAwakenings": updates.numberOfAwakenings,
                    "sleepEntries.$.reasonForAwakenings": updates.reasonForAwakenings,
                    "sleepEntries.$.feelingsUponWaking": updates.feelingsUponWaking,
                    "sleepEntries.$.timeToFallAsleep": updates.timeToFallAsleep,
                    "sleepEntries.$.reasonForFallingAsleepDelay": updates.reasonForFallingAsleepDelay,
                    "sleepEntries.$.alertnessUponWaking": updates.alertnessUponWaking,
                    "sleepEntries.$.deepSleepHours": updates.deepSleepHours,
                    "sleepEntries.$.daytimeSleepiness": updates.daytimeSleepiness,
                    "sleepEntries.$.sleepingPosition": updates.sleepingPosition,
                    "sleepEntries.$.windDownActivity": updates.windDownActivity,
                    "sleepEntries.$.totalSteps": updates.totalSteps,
                    "sleepEntries.$.totalWater": updates.totalWater,
                    "sleepEntries.$.preSleepActivity": updates.preSleepActivity,
                    "sleepEntries.$.totalExerciseMinutes": updates.totalExerciseMinutes,
                    "sleepEntries.$.bedtimeMedicine": updates.bedtimeMedicine,
                    "sleepEntries.$.totalMeditationMinutes": updates.totalMeditationMinutes,
                },
            },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedDocument) {
            return res.status(404).json({
                message: 'Sleep record not found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Sleep record updated successfully',
            success: true,
            data: updatedDocument,
        });
    } catch (err) {
        console.error('Error updating sleep record:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Delete a sleep record
// Delete a specific sleep entry
const deleteSleepRecord = async (req, res) => {
    try {
        const { userId, sleepId } = req.body;

        if (!userId || !sleepId) {
            return res.status(400).json({
                message: 'User ID and Sleep ID are required',
                success: false,
            });
        }

        // Find the sleep document for the user
        const sleepDocument = await Sleep.findOne({ userId });

        if (!sleepDocument) {
            return res.status(404).json({
                message: 'No sleep data found for the user',
                success: false,
            });
        }

        // Filter out the specific sleep entry by sleepId
        const initialLength = sleepDocument.sleepEntries.length;
        sleepDocument.sleepEntries = sleepDocument.sleepEntries.filter(
            (entry) => entry._id.toString() !== sleepId
        );

        if (sleepDocument.sleepEntries.length === initialLength) {
            return res.status(404).json({
                message: 'Sleep entry not found',
                success: false,
            });
        }

        // Save the updated document
        await sleepDocument.save();

        res.status(200).json({
            message: 'Sleep record deleted successfully',
            success: true,
        });
    } catch (err) {
        console.error('Error deleting sleep record:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


module.exports = {
    createSleepRecord,
    getSleepRecords,
    updateSleepRecord,
    deleteSleepRecord,
};
