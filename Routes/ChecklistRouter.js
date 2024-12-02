const express = require('express');
const {
    createCustomChecklist,
    getChecklists,
    updateChecklist,
    deleteChecklistItem,
} = require('../Controllers/ChecklistController');

const router = express.Router();

// Routes
router.post('/create', createCustomChecklist); // Create a new checklist
router.post('/get', getChecklists); // Get checklists by user and type
router.put('/update', updateChecklist); // Update an existing checklist
router.delete('/delete', deleteChecklistItem); // Delete a checklist

module.exports = router;
