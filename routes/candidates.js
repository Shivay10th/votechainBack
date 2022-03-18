/** @format */
const { upCandidates22 } = require('../controller/candidate');
const router = require('express').Router();

router.get('/up/2022', upCandidates22);

module.exports = router;
