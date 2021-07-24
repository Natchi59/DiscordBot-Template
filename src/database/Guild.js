const { Schema, model } = require("mongoose");

module.exports = model(
  "Guild",
  new Schema({
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      default: "!",
    },
  })
);
