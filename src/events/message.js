const Client = require("../client");
const { Message } = require("discord.js");
const GuildSchema = require("../database/Guild");

module.exports = {
  name: "message",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message) => {
    if (message.author.bot || !message.guild) return;

    let db = await GuildSchema.findOne({ guildId: message.guild.id });
    if (!db) db = await GuildSchema.create({ guildId: message.guild.id });

    const PREFIX = db.get("prefix");

    if (message.content.startsWith(PREFIX)) {
      const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (!cmd) return;

      const command = client.commands.get(cmd) || client.aliases.get(cmd);

      if (command) command.run(client, message, args, db);
    }
  },
};
