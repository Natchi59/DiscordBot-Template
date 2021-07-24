import { Command } from "../interfaces";

export const command: Command = {
  name: "ping",
  run: (client, message, args) => {
    message.channel.send("Pong");
  },
};
