import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  // GET  curl -v http://localhost:8888/
  // POST curl -v -d "name=yingjieweb" http://localhost:8888/
  console.log("request.method", request.method);
  console.log("request.url", request.url);
  console.log('request.headers', request.headers);

  // How to get POST method's body 
  const array: any[] = []
  request.on('data', (chunk) => array.push(chunk))
  request.on('end', () => {
    const body = Buffer.concat(array).toString()
    console.log('POST body', body);
    response.end();
  })
});

server.listen(8888);
