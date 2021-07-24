import { Message } from "discord.js";
import Client from "../client";

export interface Command {
  name: string;
  category?: string;
  description?: string;
  aliases?: Array<string>;
  run(client: Client, message: Message, args: string[]): any | Promise<any>;
}
