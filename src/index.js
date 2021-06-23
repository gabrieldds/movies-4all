const server = require("./loaders/express");

const port = server.get("port");
server.listen(port, () => console.info(`Application running on port: ${port}`));
