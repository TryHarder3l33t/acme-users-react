const {
  syncAndSeed,
  models: { User },
} = require("./db");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//serves static files
app.use("/dist", express.static(path.join(__dirname, "dist")));

//Send html file when you go to site
//used as an alternative for the `static()` middleware for dynamic situations.
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        attributes: {
          exclude: ["bio", "createdAt", "updatedAt"],
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/users/:id", async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    console.log("Sync and seeded");
    await app.listen(port, () => {
      console.log(`Express Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
init();
