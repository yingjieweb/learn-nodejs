/*
 * feature_3: get corresponding file by fileName
 */
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as path from "path";
import * as urlModule from "url";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request;
  const { pathname } = urlModule.parse(url || "/index.html");
  const fileName = pathname!.substring(1);
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  fs.readFile(path.resolve(__dirname, "public", fileName), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end('NOT FOUND');
    } else {
      response.end(data);
    }
  });
});

server.listen(8888);
