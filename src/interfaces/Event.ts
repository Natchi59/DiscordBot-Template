import { ClientEvents } from "discord.js";
import Client from "../client";

export interface Event {
  name: keyof ClientEvents;
  run(client: Client, ...args: any[]): any | Promise<any>;
}
