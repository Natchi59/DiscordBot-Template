import { Command } from "../interfaces";

export const command: Command = {
  name: "prefix",
  aliases: ["setprefix"],
  run: (client, message, args, db) => {
    const prefix = db.get("prefix");
    
    if (!args.length) {
      message.channel.send(`Prefix actuel: ${prefix}`);
    } else {
      const newprefix = args[0];
      if (newprefix.length < 0 || newprefix.length > 3)
        return message.channel.send("Le prefix est trop court ou trop long");

      db.set("prefix", args[0].toString());
      db.save();
      message.channel.send(`Nouveau prefix: ${newprefix}`);
    }
  },
};
