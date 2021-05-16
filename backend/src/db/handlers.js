"use strict";

const { connectToDatabase, Note } = require("./connect");

const callback = (res, statusCode, response) => res.status(statusCode).json(response);

const create = async (req, res) => {
  connectToDatabase().then(() => {
    Note.insertMany(req.body)
      .then(notes => {
        return callback(res, 200, { message: "Success", items: notes, total: notes.length });
      })
      .catch(err => callback(res, 400, { message: "Error", error: err }));
  });
};

const getAll = async (req, res) => {
  await connectToDatabase().then(async () => {
    const count = await Note.countDocuments();

    Note.find()
      .then(notes => callback(res, 200, { items: notes, total: count }))
      .catch(err => callback(res, 400, { message: "Could not fetch the notes.", error: err }));
  });
};

const getSortedData = async (req, res) => {
  const { order = "", filter = "" } = req.params;
  await connectToDatabase().then(async () => {
    if (order && filter) {
      const count = await Note.countDocuments();
      Note.find()
        .sort({ [filter]: order })
        .then(notes => callback(res, 200, { items: notes, total: count }))
        .catch(err => callback(res, 400, { message: "Could not fetch the notes.", error: err }));
    } else {
      callback(res, 400, { message: "Missing params" });
    }
  });
};

const deleteAll = (req, res) => {
  connectToDatabase().then(() => {
    Note.deleteMany()
      .then(note => callback(res, 200, { message: "Collection Deleted", items: [], total: 0 }))
      .catch(err => callback(res, 400, { message: "Error", error: err }));
  });
};

const search = async (req, res) => {
  const { schema = [], filter = "", query = "" } = req.body || {};
  if (schema.length < 0 || !filter || !query) {
    callback(res, 400, { message: "Missing params" });
  }

  const expression = schema.map(item => {
    return { [item]: { $regex: ".*" + query + ".*", $options: "i" } };
  });

  await connectToDatabase().then(() => {
    Note.find({ $or: expression })
      .then(notes => callback(res, 200, { items: notes, total: notes.length }))
      .catch(err => callback(res, 400, { message: "Could not fetch the notes.", error: err }));
  });
};

const getPaginatedData = async (req, res) => {
  let { offSet, limit } = req.params;
  offSet = parseInt(offSet) || 0;
  limit = parseInt(limit) || 10;
  console.log("getPaginatedData: ", offSet, limit);
  if (offSet < 0 || limit < 0) {
    callback(res, 400, { message: "Missing params" });
  } else {
    await connectToDatabase().then(async () => {
      const count = await Note.countDocuments();
      console.log("Lakshay: ", count);
      Note.find({})
        .skip(offSet * limit)
        .limit(limit)
        .then(notes => callback(res, 200, { items: notes, total: count }))
        .catch(err => callback(res, 400, { message: "Could not fetch the notes.", error: err }));
    });
  }
};

module.exports = {
  deleteAll,
  create,
  getAll,
  search,
  getSortedData,
  getPaginatedData,
};
