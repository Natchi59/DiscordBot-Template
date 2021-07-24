const Client = require("../client");
const { Message } = require("discord.js");
const { Document } = require("mongoose")

module.exports = {
  name: "ping",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {Document} db
   */
  run: (client, message, args, db) => {
    message.channel.send("Pong");
  },
};
