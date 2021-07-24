const { Client, Collection } = require("discord.js");
const ConfigJSON = require("../../config.json");
const handler = require("./handler");
const { connect } = require("mongoose");

module.exports = class ExtendClient extends Client {
  events = new Collection();
  commands = new Collection();
  aliases = new Collection();
  status = [];
  config = ConfigJSON;

  async init() {
    this.login(this.config.token);

    connect(this.config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }).then((m) => {
      console.log(`Connecté à la base de donnée ${m.connection.db.databaseName}`);
    });

    await handler(this);
  }
};
