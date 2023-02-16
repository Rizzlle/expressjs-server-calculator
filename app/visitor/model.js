const mongoose = require("mongoose");

let visitorSchema = mongoose.Schema(
	{
		browserId: {
			type: String,
		},
		type: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
