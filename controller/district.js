/** @format */

const District = require('../models/district');

exports.getDistrictAndConstituencyByName = (req, res) => {
	const { name } = req.params;
	// \\b is for word ending with space or end of line
	const regxp = new RegExp('^' + name.toUpperCase() + '\\b');
	District.find(
		{
			name: {
				$regex: regxp,
			},
		},
		'-_id -__v',
	)
		.then((data) => {
			return res.json(data);
		})
		.catch((e) => {
			console.log(e.message);
			return res.json({
				error: 'Error occure while finding the District',
			});
		});
};
