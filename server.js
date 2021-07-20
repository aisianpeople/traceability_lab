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

let heroList = [];

rollbar.info("Hello World!");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info('html file served successfully');
  });

  app.post("/api/hero", (req, res) => {
    let { name } = req.body;
    name = name.trim();
  
    const index = heroList.findIndex((heroName) => {
      return heroName === name;
    });
  
    if (index === -1 && name !== "") {
      heroList.push(name);
      // add rollbar log here
  
      res.status(200).send(heroList);
    } else if (name === "") {
      // add a rollbar error here
  
      res.status(400).send({ error: "no hero was provided" });
    } else {
      // add a rollbar error here too
  
      res.status(400).send({ error: "that hero already exists" });
    }
  });

  const port = process.env.PORT || 4545;
  
  app.listen(port, () => console.log(`server running on port ${port}`));