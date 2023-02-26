/* 
 * feature_1: return resources base on different url
 */
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request;
  console.log(method, url, headers);

  switch (url) {
    case "/index.html":
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      fs.readFile(
        path.resolve(__dirname, "public", "index.html"),
        (error, data) => {
          if (error) throw error;
          response.end(data);
        }
      );
      break;
    case "/style.css":
      response.setHeader("Content-Type", "text/css; charset=utf-8");
      fs.readFile(
        path.resolve(__dirname, "public", "style.css"),
        (error, data) => {
          if (error) throw error;
          response.end(data);
        }
      );
      break;
    case "/main.js":
      response.setHeader("Content-Type", "text/javascript; charset=utf-8");
      fs.readFile(
        path.resolve(__dirname, "public", "main.js"),
        (error, data) => {
          if (error) throw error;
          response.end(data);
        }
      );
      break;
    default:
      response.statusCode = 404
      response.end()
      break;
  }
});

server.listen(8888);
