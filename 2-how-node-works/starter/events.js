const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Nate");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 92);

// ////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Received");
  console.log(res);
  res.end("Request received");
});
server.on("request", (req, res) => {
  console.log("Request Received");
  res.end("Another Request received");
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waitng for requests...");
});
