/** @format */

const {
	getDistrictAndConstituencyByName,
	getalldistrict,
} = require('../controller/district');

const router = require('express').Router();

router.get('/up/district/:name', getDistrictAndConstituencyByName);

router.get('/up/district/all', getalldistrict);

module.exports = router;
