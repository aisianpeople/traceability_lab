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
app.use(rollbar.errorHandler());

let heroList = [];
heroList.push("Spider Man");

rollbar.info("Hello World!");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
    rollbar.info('html file served successfully');
  });

  app.post(`/api/hero`, (req, res) => {
    let { name } = req.body;
    name = name.trim();
  
    const index = heroList.findIndex((heroName) => {
      return heroName === name;
    });
  
    if (index === -1 && name !== "") {
        heroList.push(name);
        rollbar.log(`${name} added to hero list`)
  
        res.status(200).send(heroList);
    } else if (name === "") {
        rollbar.error("no hero name was provided")
  
        res.status(400).send({ error: "no hero name was provided" });
    } else {
        rollbar.error(`${name} already exists`)
  
        res.status(400).send({ error: `${name} already exists` });
    }
  });

  const port = process.env.PORT || 5500;
  
  app.listen(port, () => console.log(`server running on port ${port}`));