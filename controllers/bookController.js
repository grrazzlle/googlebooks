const db = require('../models/book');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log(req.query);
    db
        .find(req.query)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  findById: function(req, res) {
    db
        .findById(req.params.id)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    db
        .create(req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  remove: function(req, res) {
    db
        .findById({_id: req.params.id})
        .then((dbModel) => dbModel.remove())
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
};
