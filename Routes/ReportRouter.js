const express = require('express');
const {generateOrUpdateTodayReport,getReportByDate,getCombinedReport} = require('../Controllers/ChecklistController')
const router = express.Router();

router.post('/generateReport', generateOrUpdateTodayReport);
router.post('/getReportByDate', getReportByDate);
router.post('/getCombinedReport', getCombinedReport);

module.exports = router;