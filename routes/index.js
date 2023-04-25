const express = require('express');
const { uploadFile } = require('../operations/uploadImages');
const router = express.Router();

router.post('/upload/main-image', uploadFile ) 

module.exports = router;
