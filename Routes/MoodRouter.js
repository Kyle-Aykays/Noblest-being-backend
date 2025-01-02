const express = require('express');
const router = express.Router(); 


const {createMood} = require('../Controllers/MoodController')

router.post('./create', createMood); 

module.exports = router;