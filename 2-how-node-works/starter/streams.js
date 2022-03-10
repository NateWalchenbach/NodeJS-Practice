const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 (Node loads entire file to mem)
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);

  //     res.end(data);
  //   });

  //   Solution 2: Streams
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  // Solutuion 3
  const readable = fs.createReadStream("test-file.txt");
  //   readableSource.pip(writeableDest)
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
