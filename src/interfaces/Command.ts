import { Message } from "discord.js";
import { Document } from "mongoose";
import Client from "../client";
import { Guild } from "./Database";

export interface Command {
  name: string;
  category?: string;
  description?: string;
  aliases?: Array<string>;
  run(client: Client, message: Message, args: string[], db?: Guild & Document<any, any, Guild>): any | Promise<any>;
}
