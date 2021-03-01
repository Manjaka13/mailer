"use strict";
require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const app = Express();
const port = process.env.PORT || 3300;
const send_mail = require("./mail");

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.json({
		response: "You can send emails at /",
		structure: "provide these infos in POST request: {destination, subject, message}",
		status: 1
	});
});

app.post("/", (req, res) => {
	const {destination, subject, message} = req.body;
	if(destination && subject && message) {
		const mail = {
			origin: "manjaka.rajaonson@gmail.com",
			destination: destination,
			subject: subject,
			message: message
		};
		send_mail(mail).then(() => {
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