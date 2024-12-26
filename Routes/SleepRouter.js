const express = require('express')

const router = express.Router(); 
 const {getSleepRecords,createSleepRecord,updateSleepRecord,deleteSleepRecord}= require("../Controllers/SleepController");



router.post('/create', createSleepRecord);
router.post ('/get', getSleepRecords);
router.put('/update', updateSleepRecord);
router.delete('/delete', deleteSleepRecord);


module.exports = router;