const express = require('express');
const path = require('path');
const uuidv4 = require('uuid/v4');

const app = express();

const products = ['Shoes', 'Cars', 'Jewelery', "Men's Clothing", "Women's Clothing", 'Education', 'Consulting']

const randomProductName = () => {
	return products[Math.floor(Math.random() * (products.length - 0)) + 0]
}

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res) => {
	console.log('Checking if user has sent us a cookie from global middleware.')
	console.log('Logging Request Headers.')
	console.log(req.headers)
	if (!req.headers['Cookie']) {
		console.log('Processed Request - User Does Not Have Cookie.')
		const uniqueID = uuidv4();
		res.setHeader('Set-Cookie', [`id=${uniqueID}`, `contentFocus=${randomProductName()}`]);
	}
	console.log("Logging Response Headers.")
	console.log(res.headers)
})

app.get('*', (req, res) => {
	console.log('Checking if user has sent us a cookie from catch-all handler.')
	console.log('Logging Request Headers.')
	console.log(req.headers)
	if (!req.headers['Cookie']) {
		console.log('Processed Request - User Does Not Have Cookie.')
		const uniqueID = uuidv4();
		res.setHeader('Set-Cookie', [`id=${uniqueID}`, `contentFocus=${randomProductName()}`]);
	}
	console.log("Logging Response Headers.")
	console.log(res.headers)
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use(function(err, req, res, next) {
	console.log(err)
	res.status(err.status || 500).send();
});

const port = process.env.PORT || 5000;

app.listen(port)

console.log(`Audience Service Host listening on ${port}`)