module.exports = (temp, product) =>  {
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