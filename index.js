const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
	const { url: pathName } = req;
	const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
	const tempOverview = fs.readFileSync(
		`${__dirname}/templates/template-overview.html`,
		'utf-8'
	);
	const tempCard = fs.readFileSync(
		`${__dirname}/templates/template-card.html`,
		'utf-8'
	);
	const tempProduct = fs.readFileSync(
		`${__dirname}/templates/template-product.html`,
		'utf-8'
	);
	const dataObj = JSON.parse(data);

	function replaceTemplate(temp, product) {
    // console.log(product.productName)
    let output = temp.replace(/{%productName%}/g, product.productName)
    output = output.replace(/{%image%}/g, product.image)
    output = output.replace(/{%price%}/g, product.price)
    output = output.replace(/{%from%}/g, product.from)
    output = output.replace(/{%nutrients%}/g, product.nutrients)
    output = output.replace(/{%quantity%}/g, product.quantity)
    output = output.replace(/{%description%}/g, product.productName)
    output = output.replace(/{%id%}/g, product.id)

    if(!product.organic) output = output.replace(/{%not-organic%}/g, 'not-organic');
    return output;

		// let temp = card;
		// Object.entries(el).forEach(([key, val], i) => {
		// 	if (key !== 'id') {
		// 		if (i == 1) {
		// 			console.log(`{%${key%}}`);
    //       console.log(val)
		// 		}
		// 		temp.replaceAll(`{%${key%}}`, val);
		// 	}
		// });

		// return temp;
	}

	if (pathName === '/overview' || pathName === '/') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join('');
		const output = tempOverview.replace('{%productCards%}', cardsHtml);
		res.end(output);
		// res.end(tempOverview);
	} else if (pathName === '/product') {
		res.end('this is the product');
	} else if (pathName === '/api') {
		res.writeHead(200, { 'content-type': 'application/json' });
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end("<h2 style={color: 'blue'}>page not found</h2>");
	}
	// res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('💥listening to request on port 8000');
});
