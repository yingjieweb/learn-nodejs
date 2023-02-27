/*
 * feature_6: add cache through Cache-Control
 */
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as path from "path";
import * as urlModule from "url";

const server = http.createServer();
// change this field by commander line -> 
// install commander package and write cli.ts ->
// through cli.ts to get cacheAge from 'tsnd index.ts -c 3600'
let cacheAge = 3600 * 24 * 365;

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request;

  if (method !== "GET") {
    response.statusCode = 405;
    response.end();
    return;
  }

  const { pathname } = urlModule.parse(url || "/index.html");
  const fileName = pathname!.substring(1) || "index.html";
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  fs.readFile(path.resolve(__dirname, "public", fileName), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(
          path.resolve(__dirname, "public", "404.html"),
          (error, data) => {
            response.end(data);
          }
        );
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end("Forbidden");
      } else {
        response.statusCode = 500;
        response.end("SERVER IS BUSY, PLEASE TRY AGAIN LATER");
      }
    } else {
      response.setHeader("Cache-Control", `public, max-age=${cacheAge}`);
      response.end(data);
    }
  });
});

server.listen(8888);
