const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

// server.post("/games", (req, res) => {
//   const { changes } = req.body;

//   if (!changes) {
//     res.status(422).json({ error: "Please fill in all categories." });
//   } else {
//     db.insert(changes)
//       .into("games")
//       .then(game => {
//         res.status(201).json(game);
//       })
//       .catch(err => {
//         res.status(500).json({
//           errror: "There was an error while saving the game to the database."
//         });
//       });
//   }
// });

server.post("/games", (req, res) => {
  const changes = req.body;

  if (!changes.title) {
    res.status(422).json({ error: "Please fill in all categories" });
  } else {
    db.insert(changes)
      .into("games")
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the project to the database."
        });
      });
  }
});

// server.post("/games", (req, res) => {
//   const postInfo = req.body;

//   if (!postInfo.title || !postInfo.contents) {
//     return res.status(400).json({
//       errorMessage: "Please provide title and contents for the game."
//     });
//   }

//   db.insert(postInfo).then(result => {
//     db.findById(result.id)
//       .then(game => {
//         res.status(201).json(game);
//       })
//       .catch(err =>
//         res.status(500).json({
//           error: "There was an error while saving the post to the database"
//         })
//       );
//   });
// });

server.get("/games", (req, res) => {
  db("games")
    .then(games => {
      if (games) {
        res.status(200).json(games);
      } else {
        res.status(404).json({ error: "Games not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The games information could not be retrieved." })
    );
});

module.exports = server;
