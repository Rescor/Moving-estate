const express = require("express");
const config = require("config");
const router = require("./routes/");
const PORT = config.get("port");
const path = require("path");

const indexHTML = dir => (_, res) => {
  res.sendFile(path.join(__dirname, dir,  "index.html"));
}

express()
  .use(express.json())
  .use("/api", router)
  .use(express.static("public"))
  .use("/admin", indexHTML("../public/admin"))
  .use("/", indexHTML("../public"))
  .listen(PORT, () => console.log(`Server started on :${PORT}`));
