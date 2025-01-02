const Checklist = require('../Models/Checklist')
const Report = require('../Models/Report')
// Create a New Checklist

// Create or Add Custom Task to Existing Checklist
const createCustomChecklist = async (req, res) => {
    try {
        const { userId, checklistType, customItems } = req.body;

        // Validate the request body
        if (!userId || !checklistType || !customItems || customItems.length === 0) {
            return res.status(400).json({
                message: 'User ID, checklist type, and at least one custom item are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if(!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Add custom items to the existing checklist's items array
        checklist.items.push(...customItems);

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Custom checklist items added successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error adding custom checklist items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

const getLowPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'low');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


const gethighPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'high');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};



const getmediumPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority === 'medium');

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};




const getempthyPriorityItems = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        // Find the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found',
                success: false,
            });
        }

        // Filter items with low priority
        const lowPriorityItems = checklist.items.filter((item) => item.priority == "");

        if (lowPriorityItems.length === 0) {
            return res.status(404).json({
                message: 'No low-priority items found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Low-priority items retrieved successfully',
            success: true,
            data: lowPriorityItems,
        });
    } catch (err) {
        console.error('Error retrieving low-priority items:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Get Checklists by User and Type
const getChecklists = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({
                message: 'User ID and checklist type are required',
                success: false,
            });
        }

        const checklists = await Checklist.find({ user: userId, checklistType, priority: 'low' });
        if (checklists.length === 0) {
            return res.status(404).json({
                message: 'No checklists found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Checklists retrieved successfully',
            success: true,
            data: checklists,
        });
    } catch (err) {
        console.error('Error retrieving checklists:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


// Update a Checklist
const updateChecklist = async (req, res) => {
    try {
        const { userId, checklistType, taskName, updates } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskName || !updates) {
            return res.status(400).json({
                message: 'User ID, checklist type, task name, and updates are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Find the task by its name and apply updates
        const taskIndex = checklist.items.findIndex(item => item.name === taskName);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Ensure that the name is not being overwritten
        const updatedTask = {
            name: checklist.items[taskIndex].name,  // Keep the existing name
            ...checklist.items[taskIndex],          // Preserve other properties
            ...updates                             // Apply updates
        };

        // Update the task in the checklist
        checklist.items[taskIndex] = updatedTask;

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Checklist item updated successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error updating checklist:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

// const deleteChecklistItem = async (req, res) => {
//     try {
//         const { userId, checklistType, taskName } = req.body;

//         // Validate the input data
//         if (!userId || !checklistType || !taskName) {
//             return res.status(400).json({
//                 message: 'User ID, checklist type, and task name are required',
//                 success: false,
//             });
//         }

//         // Find the checklist for the user and checklistType
//         const checklist = await Checklist.findOne({ user: userId, checklistType });

//         if (!checklist) {
//             return res.status(404).json({
//                 message: 'Checklist not found for this user and checklist type',
//                 success: false,
//             });
//         }

//         // Remove the task from the items array
//         const updatedItems = checklist.items.filter(item => item.name !== taskName);

//         // If no tasks are left after filtering, you might choose to delete the checklist altogether
//         if (updatedItems.length === checklist.items.length) {
//             return res.status(404).json({
//                 message: 'Task not found in the checklist',
//                 success: false,
//             });
//         }

//         // Update the checklist's items array
//         checklist.items = updatedItems;

//         // Save the updated checklist
//         await checklist.save();

//         res.status(200).json({
//             message: 'Checklist item deleted successfully',
//             success: true,
//             data: checklist,
//         });
//     } catch (err) {
//         console.error('Error deleting checklist item:', err);
//         res.status(500).json({
//             message: 'Internal Server Error',
//             success: false,
//         });
//     }
// };


const deleteChecklistItem = async (req, res) => {
    try {
        const { userId, checklistType, taskId } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskId) {
            return res.status(400).json({
                message: 'User ID, checklist type, and task ID are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Remove the task from the items array by ID
        const updatedItems = checklist.items.filter(item => item._id.toString() !== taskId);

        // If no tasks are removed (i.e., task not found), return an error
        if (updatedItems.length === checklist.items.length) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Update the checklist's items array
        checklist.items = updatedItems;

        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Checklist item deleted successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error deleting checklist item:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

const rescheduleMissedTasks = async (userId, checklistType) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            console.log(`No checklist found for user ${userId} and type ${checklistType}`);
            return;
        }

        const missedTasks = checklist.items.filter(
            (item) => !item.completed && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low') &&
            !item.rescheduledFrom
        );

        if (missedTasks.length > 0) {
            const rescheduledTasks = missedTasks.map((task) => {
                const newTask = task.toObject();
                delete newTask._id; // Remove the original _id to let Mongoose generate a new one
                return {
                    ...newTask,
                    completed: false,
                    rescheduledFrom: today,
                };
            });

            checklist.items.push(...rescheduledTasks);
            await checklist.save();

            console.log(
                `Rescheduled ${rescheduledTasks.length} tasks for user ${userId} in checklist type ${checklistType}`
            );
        } else {
            console.log(`No high-priority tasks to reschedule for user ${userId}`);
        }
    } catch (err) {
        console.error('Error in rescheduling missed tasks:', err);
    }
};

const resetCompletedTasks = async (userId) => {
    try {
        // Find all checklists for the user
        const checklists = await Checklist.find({ user: userId });

        if (checklists.length === 0) return;

        // Update each checklist
        for (let checklist of checklists) {
            checklist.items.forEach((item) => {
                item.completed = false; // Reset the completed field
            });
            await checklist.save(); // Save the updated checklist
        }

        console.log(`Reset completed tasks for user ${userId}`);
    } catch (err) {
        console.error(`Error resetting completed tasks for user ${userId}:`, err);
    }
};

// const rescheduleMissedTasks = async (userId, checklistType) => {
//     try {
//         const today = new Date().toISOString().split('T')[0];
//         const checklist = await Checklist.findOne({ user: userId, checklistType });

//         if (!checklist) {
//             console.log(`No checklist found for user ${userId} and type ${checklistType}`);
//             return;
//         }

//         const missedTasks = checklist.items.filter(
//             (item) => !item.completed && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low')
//         );

//         if (missedTasks.length > 0) {
//             const rescheduledTasks = missedTasks.map((task) => ({
//                 ...task.toObject(),
//                 completed: false,
//                 rescheduledFrom: today,
//             }));

//             checklist.items.push(...rescheduledTasks);
//             await checklist.save();

//             console.log(
//                 `Rescheduled ${rescheduledTasks.length} tasks for user ${userId} in checklist type ${checklistType}`
//             );
//         } else {
//             console.log(`No high-priority tasks to reschedule for user ${userId}`);
//         }
//     } catch (err) {
//         console.error('Error in rescheduling missed tasks:', err);
//     }
// };


const toggleTaskCompletion = async (req, res) => {
    try {
        const { userId, checklistType, taskId, isCompleted } = req.body;

        // Validate the input data
        if (!userId || !checklistType || !taskId || isCompleted === undefined) {
            return res.status(400).json({
                message: 'User ID, checklist type, task ID, and isCompleted status are required',
                success: false,
            });
        }

        // Find the checklist for the user and checklistType
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            return res.status(404).json({
                message: 'Checklist not found for this user and checklist type',
                success: false,
            });
        }

        // Find the task by ID
        const task = checklist.items.id(taskId);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found in the checklist',
                success: false,
            });
        }

        // Update the is_completed field
        task.completed = isCompleted;
        
        if (isCompleted) {
            task.streak = (task.streak || 0) + 1; // Increment streak
        } else if (task.streak > 0) {
            task.streak -= 1; // Decrement streak
        }
        // Save the updated checklist
        await checklist.save();

        res.status(200).json({
            message: 'Task completion status updated successfully',
            success: true,
            data: checklist,
        });
    } catch (err) {
        console.error('Error updating task completion status:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


const generateAndSaveReportforcron = async (userId,checklistType) => {
    try {
       
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);


        // Fetch the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });

        if (!checklist) {
            
            console.log(`No checklist found for user ${userId} and type ${checklistType}`);
            return;
        }

        // Calculate stats
        const totalTasks = checklist.items.length;
        const completedTasks = checklist.items.filter((task) => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const completionPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);

        const priorityStats = {
            high: checklist.items.filter((task) => task.priority === 'high' && task.completed).length,
            medium: checklist.items.filter((task) => task.priority === 'medium' && task.completed).length,
            low: checklist.items.filter((task) => task.priority === 'low' && task.completed).length
        };

        // Find or create a report document for the user
        let report = await Report.findOne({ user: userId });
        if (!report) {
            report = new Report({ user: userId, reports: [] });
        }

        // Check if a report already exists for today
        const existingReport = report.reports.find((r) =>
            r.checklistType === checklistType && r.date >= todayStart && r.date <= todayEnd
        );

        if (existingReport) {
            
            console.log(`Report already exists for user ${userId} and checklist type ${checklistType}`);
            return;
        }

        // Add a new report
        report.reports.push({
            date: new Date(),
            checklistType,
            totalTasks,
            completedTasks,
            pendingTasks,
            completionPercentage,
            priorityStats,
        });

        await report.save();
        
        console.log(`Report saved successfully for user ${userId} and type ${checklistType}`);
    } catch (err) {
        res.status(400).json({
            message:  err
        })
        console.error(`Error generating and saving report for user ${userId}:`, err);
    }
};


// Generate and save the daily report
const generateOrUpdateTodayReport = async (req, res) => {
    try {
        const { userId, checklistType } = req.body;

        if (!userId || !checklistType) {
            return res.status(400).json({ message: "Invalid input data", success: false });
        }

        // Normalize today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch the checklist for the user and type
        const checklist = await Checklist.findOne({ user: userId, checklistType });
        if (!checklist) {
            return res.status(404).json({ message: "Checklist not found", success: false });
        }

        // Calculate stats for the report
        const totalTasks = checklist.items.length;
        const completedTasks = checklist.items.filter((task) => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const completionPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

        const priorityStats = {
            high: {
                total: checklist.items.filter((task) => task.priority === "high").length,
                completed: checklist.items.filter((task) => task.priority === "high" && task.completed).length,
            },
            medium: {
                total: checklist.items.filter((task) => task.priority === "medium").length,
                completed: checklist.items.filter((task) => task.priority === "medium" && task.completed).length,
            },
            low: {
                total: checklist.items.filter((task) => task.priority === "low").length,
                completed: checklist.items.filter((task) => task.priority === "low" && task.completed).length,
            },
        };

        // Find or create a report document for the user
        let report = await Report.findOne({ user: userId });
        if (!report) {
            report = new Report({ user: userId, reports: [] });
        }

        // Remove any existing report for today and the same checklist type
        report.reports = report.reports.filter((r) => {
            const reportDate = new Date(r.date);
            reportDate.setHours(0, 0, 0, 0);
            return !(r.checklistType === checklistType && reportDate.getTime() === today.getTime());
        });

        // Add the new report for today
        const newReport = {
            date: new Date(),
            checklistType,
            totalTasks,
            completedTasks,
            pendingTasks,
            completionPercentage,
            priorityStats,
        };
        report.reports.push(newReport);

        // Save the updated report document
        await report.save();

        res.status(200).json({
            message: "Report generated or updated successfully",
            success: true,
            data: newReport,
        });
    } catch (err) {
        console.error("Error generating or updating report:", err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};





const getReportByDate = async (req, res) => {
    try {
        const { userId, checklistType, date } = req.body;

        if (!userId || !checklistType || !date) {
            return res.status(400).json({ message: "Invalid input data", success: false });
        }

        // Normalize the date
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        // Fetch the user's report document
        const report = await Report.findOne({ user: userId });
        if (!report) {
            return res.status(404).json({ message: "Report not found", success: false });
        }

        // Find the specific report for the date and checklist type
        const specificReport = report.reports.find((r) => {
            const reportDate = new Date(r.date);
            reportDate.setHours(0, 0, 0, 0);
            return (
                r.checklistType === checklistType &&
                reportDate.getTime() === normalizedDate.getTime()
            );
        });

        if (!specificReport) {
            return res.status(404).json({ message: "No report found for the specified date", success: false });
        }

        res.status(200).json({
            message: "Report retrieved successfully",
            success: true,
            data: specificReport,
        });
    } catch (err) {
        console.error("Error fetching report by date:", err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const getCombinedReport = async (req, res) => {
    try {
        const { userId, date } = req.body;

        if (!userId || !date) {
            return res.status(400).json({
                message: "User ID and date are required",
                success: false,
            });
        }

        // Normalize the provided date
        const reportDate = new Date(date);
        reportDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reportDate > today) {
            return res.status(400).json({
                message: "Reports for future dates cannot be generated",
                success: false,
            });
        }

        // Fetch the user's report document
        const report = await Report.findOne({ user: userId });

        if (!report) {
            return res.status(404).json({
                message: "No reports found for this user",
                success: false,
            });
        }

        // Combine reports for the specified date
        const combinedReport = {
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
            completionPercentage: 0,
            priorityStats: {
                high: { total: 0, completed: 0 },
                medium: { total: 0, completed: 0 },
                low: { total: 0, completed: 0 },
            },
        };

        if (report && report.reports.length > 0) {
            const relevantReports = report.reports.filter((r) => {
                const rDate = new Date(r.date);
                rDate.setHours(0, 0, 0, 0);
                return rDate.getTime() === reportDate.getTime();
            });

            // Aggregate stats from the relevant reports
            for (const r of relevantReports) {
                combinedReport.totalTasks += r.totalTasks;
                combinedReport.completedTasks += r.completedTasks;
                combinedReport.pendingTasks += r.pendingTasks;

                combinedReport.priorityStats.high.total += r.priorityStats.high.total;
                combinedReport.priorityStats.high.completed += r.priorityStats.high.completed;

                combinedReport.priorityStats.medium.total += r.priorityStats.medium.total;
                combinedReport.priorityStats.medium.completed += r.priorityStats.medium.completed;

                combinedReport.priorityStats.low.total += r.priorityStats.low.total;
                combinedReport.priorityStats.low.completed += r.priorityStats.low.completed;
            }

            combinedReport.completionPercentage =
                combinedReport.totalTasks > 0
                    ? ((combinedReport.completedTasks / combinedReport.totalTasks) * 100).toFixed(2)
                    : 0;
        }

        // If no relevant reports are found, calculate based on available tasks
        if (combinedReport.totalTasks === 0) {
            const checklists = await Checklist.find({ user: userId });

            if (checklists.length > 0) {
                for (const checklist of checklists) {
                    combinedReport.totalTasks += checklist.items.length;
                }
                combinedReport.pendingTasks = combinedReport.totalTasks;
                combinedReport.completionPercentage = 0; // No tasks completed
            }
        }

        res.status(200).json({
            message: "Combined report retrieved successfully",
            success: true,
            data: combinedReport,
        });

        console.log(`Combined report retrieved for user ${userId} on ${reportDate.toISOString()}`);
    } catch (err) {
        console.error("Error generating combined report:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


module.exports = {
    createCustomChecklist ,
    getChecklists,
    updateChecklist,
    deleteChecklistItem,
    rescheduleMissedTasks,
    toggleTaskCompletion,
    getLowPriorityItems,
    gethighPriorityItems,
    getmediumPriorityItems,
    getempthyPriorityItems,
    resetCompletedTasks,
    generateAndSaveReportforcron,
    getReportByDate,
    getCombinedReport, 
    generateOrUpdateTodayReport,
};
