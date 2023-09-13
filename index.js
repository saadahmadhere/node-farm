const fs = require('fs');
const http = require('http');
const url = require('url');

function replaceTemplate(temp, product) {
  // temp should be a string and product should be an object.
	let output = temp.replace(/{%productName%}/g, product.productName);
	output = output.replace(/{%image%}/g, product.image);
	output = output.replace(/{%price%}/g, product.price);
	output = output.replace(/{%from%}/g, product.from);
	output = output.replace(/{%nutrients%}/g, product.nutrients);
	output = output.replace(/{%quantity%}/g, product.quantity);
	output = output.replace(/{%description%}/g, product.productName);
	output = output.replace(/{%id%}/g, product.id);

	if (!product.organic)
		output = output.replace(/{%not-organic%}/g, 'not-organic');
	return output;
}

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

const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/overview' || pathname === '/') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join('');

		const output = tempOverview.replace('{%productCards%}', cardsHtml);
		res.end(output);
	} else if (pathname === '/product') {
    const product = dataObj[query?.id];

		const output = replaceTemplate(tempProduct, product);

		res.end(output);

	} else if (pathname === '/api') {
		res.writeHead(200, { 'content-type': 'application/json' });
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end('<h2>page not found</h2>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('💥listening to request on port 8000');
});
