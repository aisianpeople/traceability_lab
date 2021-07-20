const express = require("express");
const path = require("path");

const Rollbar = require('rollbar');

const rollbar = new Rollbar({
  accessTojen: '25609357d325482db6e3e4ae2a61e51b',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const app = express();
app.use(express.json());

rollbar.info("Hello World!");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info('html file served successfully');
  });

  const port = process.env.PORT || 4545;
  
  app.listen(port, () => console.log(`server running on port ${port}`));