const http = require("http");
const fs = require("fs");
const PORT = 3000;
const hostName = "localhost";

const server = http.createServer((req, res) => {
  const handleReadFile = (statusCode, fileLocation) => {
    fs.readFile(fileLocation, (err, data) => {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  };

  if (req.url === "/") {
    handleReadFile(200, "./File/Home.html");
  } else if (req.url === "/contact") {
    handleReadFile(200, "./File/Contact.html");
  } else if (req.url === "/blog") {
    handleReadFile(200, "./File/Blog.html");
  } else {
    handleReadFile(200, "./File/error.html");
  }
});

server.listen(PORT, hostName, () => {
  console.log(`Server is running at http://${hostName}:${PORT}`);
});