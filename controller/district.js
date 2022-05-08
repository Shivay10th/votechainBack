/** @format */

const District = require('../models/district');

exports.getDistrictAndConstituencyByName = (req, res) => {
	const { name } = req.params;
	const regxp = new RegExp(name.toUpperCase());
	District.find(
		{
			name: {
				$regex: regxp,
			},
		},
		'-_id -__v',
	)
		.then((data) => {
			data._id = undefined;
			return res.json(data);
		})
		.catch((e) => {
			console.log(e.message);
			return res.json({
				error: 'Error occure while finding the District',
			});
		});
};
