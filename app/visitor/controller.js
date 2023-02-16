const moment = require("moment/moment");
const Visitor = require("./model");

module.exports = {
	auth: async (req, res) => {
		try {
			const { browserId, type } = req.body;

			const visitor = new Visitor({ browserId, type });
			await visitor.save();

			res.status(200).json({ data: visitor });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	chartVisitors: async (req, res) => {
		try {
			let response = [];
			const visitorsLogin = await Visitor.find({ type: "login" });
			const visitorsLogout = await Visitor.find({ type: "logout" });

			visitorsLogin.forEach((item) => {
				response.push({
					browserId: item.browserId,
					loginTimestamp: item.createdAt,
				});
			});

			visitorsLogout.forEach((item) => {
				let index = response.findIndex(
					(visitor) => item.browserId === visitor.browserId
				);
				response[index].logoutTimestamp = item.createdAt;
			});

			response.forEach((item) => {
				const start = moment(item.loginTimestamp);
				const end = moment(item.logoutTimestamp);

				const diffInMinutes = end.diff(start, "minutes");

				item.duration = diffInMinutes;

				return item;
			});

			res.status(200).json({ data: response });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};
