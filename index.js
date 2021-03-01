"use strict";
require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const app = Express();
const port = process.env.PORT || 3300;
const send_mail = require("./mail");

app.use(cors());
app.use(Express.json());

app.get("/", (req, res) => {
	const {destination, subject, message} = req.body;
	if(destination && subject && message) {
		send_mail({
			origin: "manjaka.rajaonson@gmail.com",
			destination: destination,
			subject: subject,
			message: message
		}).then(() => {
			res.json({
				response: "Your email has been sent !",
				status: 1
			});
		}).catch(e => {
			res.json({
				response: e,
				status: -1
			});
		});
	}
	else
		res.json({
			response: "Missing information in sending email",
			status: -1
		});
});

app.listen(port, () => {
	console.log("Mailer listening on port " + port);
});