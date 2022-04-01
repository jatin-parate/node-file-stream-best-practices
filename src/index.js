const http = require("http");
const toobusy = require("toobusy-js");
const app = require("./app");

const server = http.createServer(app);

// toobusy.maxLag(10);
// toobusy.onLag(function (currentLag) {
//   console.log("Event loop lag detected! Latency: " + currentLag + "ms");
// });

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

process.on("SIGINT", function () {
  server.close();
  // calling .shutdown allows your process to exit normally
  toobusy.shutdown();
  process.exit();
});
