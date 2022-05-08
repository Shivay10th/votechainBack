/** @format */

const { getDistrictAndConstituencyByName } = require('../controller/district');

const router = require('express').Router();

router.get('/up/district/:name', getDistrictAndConstituencyByName);

module.exports = router;
