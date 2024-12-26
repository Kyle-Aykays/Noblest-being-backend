const express = require('express'); 
const router = express.Router();

const {createDreamDocument}= require('../Controllers/DreamController');
const { create } = require('../Models/Activity');
router.post('/create',createDreamDocument); 


module.exports = router; 

