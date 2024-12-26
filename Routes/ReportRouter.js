const express = require('express');
const {generateAndSaveReport,getReportByDate,getCombinedReport} = require('../Controllers/ChecklistController')
const router = express.Router();

router.post('/generateReport', generateAndSaveReport);
router.post('/getReportByDate', getReportByDate);
router.post('/getCombinedReport', getCombinedReport);

module.exports = router;
