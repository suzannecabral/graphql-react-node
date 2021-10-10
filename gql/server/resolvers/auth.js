const { gql } = require("apollo-server-express");
const me = () => "Suzanne";

module.exports = {
	Query: {
		me,
	},
};
