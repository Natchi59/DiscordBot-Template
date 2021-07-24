import { Client, Collection } from "discord.js";
import { Event, Command, Config } from "../interfaces";
import ConfigJSON from "../../config.json";
import { handler } from "./handler";

class ExtendClient extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
  readonly config: Config = ConfigJSON;

  public async init(): Promise<void> {
    this.login(this.config.token);

    await handler(this);
  }
}

export default ExtendClient;
