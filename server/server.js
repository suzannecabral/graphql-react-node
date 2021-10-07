const express = require("express");
require("dotenv").config;

const app = express();

// rest endpoint
app.get("/rest", function (req, res) {
	res.json({
		data: "rest endpoint is working",
	});
});

// port
app.listen(process.env.PORT, function () {
	console.log(`server is ready at http://localhost:${process.env.PORT}`);
});
