import { Client, Collection } from "discord.js";
import { Event, Command, Config } from "../interfaces";
import ConfigJSON from "../../config.json";
import { handler } from "./handler";
import { connect } from "mongoose";

class ExtendClient extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
  readonly config: Config = ConfigJSON;

  public async init(): Promise<void> {
    this.login(this.config.token);

    connect(this.config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }).then((m) => {
      console.log(
        `Connecté à la base de donnée ${m.connection.db.databaseName}`
      );
    });

    await handler(this);
  }
}

export default ExtendClient;
