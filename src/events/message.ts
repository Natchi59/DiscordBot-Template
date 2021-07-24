import { Message } from "discord.js";
import { Event } from "../interfaces";

export const event: Event = {
  name: "message",
  run: (client, message: Message) => {
    if (message.author.bot || !message.guild) return;

    const PREFIX = "!";

    if (message.content.startsWith(PREFIX)) {
      const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (!cmd) return;

      const command = client.commands.get(cmd) || client.aliases.get(cmd);
      if (!command) return;

      command.run(client, message, args);
    }
  },
};
