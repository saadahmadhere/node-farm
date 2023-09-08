const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  const {url: pathName} = req;

  if(pathName === '/overview' || pathName === 'overview'){
    res.end("this is the overview")
  }else if(pathName === '/product'){
    res.end("this is the product")
  }else{
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end("<h2 style={color: 'blue'}>page not found</h2>")
  }
  // res.end('Hello from the server');
});


server.listen(8000, '127.0.0.1', () => {
  console.log('💥listening to request on port 8000')
})
