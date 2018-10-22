const express = require('express');
const path = require('path');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser')
const serveStatic = require('serve-static')

const app = express();

const products = ['Shoes', 'Cars', 'Jewelery', "Men's Clothing", "Women's Clothing", 'Education', 'Consulting']

const randomProductName = () => {
	return products[Math.floor(Math.random() * (products.length - 0)) + 0]
}

app.use(cookieParser());

app.use('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, partner_1_tracking_id, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
});

app.use('/', (req, res, next) => {
	console.log("Logging FORWARDED-FOR HEADERS", req.headers["x-forwarded-for"])
	console.log("Logging IP.")
	console.log("REQ.IP :: ", req.ip)
	console.log("REQUEST.CONNECTION.REMOTEADDRESS", req.connection.remoteAddress)
	console.log("LOGGING COOKIES: ", req.cookies)
	if (!req.cookies['audience_tracking_id']) {
		console.log('Processed Request - User Does Not Have Cookie.')
		const uniqueID = uuidv4();
		res.setHeader('Set-Cookie', [`audience_tracking_id=${uniqueID}`, `contentFocus=${randomProductName()}`]);
	}
	/*
		console.log("Logging Response Headers.")
		console.log(res.getHeaders())
	*/
	next();
});


app.get('*', (req, res) => {
	console.log("SendFile Sent")
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
});


app.use(serveStatic(path.join(__dirname, 'client/build')))

app.use(function(err, req, res, next) {
	console.log(err)
	res.status(err.status || 500).send();
});


const port = process.env.PORT || 6000;

app.listen(port);

console.log(`Audience Service Host listening on ${port}`);