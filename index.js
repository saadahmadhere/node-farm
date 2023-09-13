const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));

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
