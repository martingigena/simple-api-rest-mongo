import mongojs from "mongojs";

const ObjectID = require("mongodb").ObjectID;
const db = mongojs("database-movies", ["movies"]);

module.exports = (app) => {
  app.get("/movies", (req, res) => {
    db.movies.find((err, movies) => {
      res.json({
        movies,
      });
    });
  });

  app.post("/movie", (req, res) => {
    let newMovie = req.body;

    db.movies.insert(newMovie, (err, movie) => {
      res.json({
        movie,
      });
    });
  });

  app.put("/movie/:id", (req, res) => {
    let updatedMovie = req.body;
    db.movies.updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: updatedMovie },
      { upsert: true },
      (err, response) => {
        res.json({
          response,
        });
      }
    );
  });

  app.delete("/movie/:id", (req, res) => {
    db.movies.remove(
      {
        _id: new ObjectID(req.params.id),
      },
      (err, response) => {
        res.json({ response });
      }
    );
  });
};
