import { Message } from "discord.js";
import { Event } from "../interfaces";
import GuildSchema from "../database/Guild";

export const event: Event = {
  name: "message",
  run: async (client, message: Message) => {
    if (message.author.bot || !message.guild) return;

    let db = await GuildSchema.findOne({ guildId: message.guild.id });
    if (!db) db = await GuildSchema.create({ guildId: message.guild.id });

    const PREFIX: string = db.get("prefix");

    if (message.content.startsWith(PREFIX)) {
      const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (!cmd) return;

      const command = client.commands.get(cmd) || client.aliases.get(cmd);
      if (!command) return;

      command.run(client, message, args, db);
    }
  },
};
