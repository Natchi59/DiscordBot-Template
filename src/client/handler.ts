import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import Client from ".";
import { Event, Command } from "../interfaces";

interface ImportEvent {
  event: Event;
}

interface ImportCommand {
  command: Command;
}

async function handlerEvents(
  client: Client,
  dirEvents: string = "../events/"
): Promise<void> {
  const pathEvents = join(__dirname, dirEvents);
  const filesEvents = await readdir(pathEvents);

  for (const file of filesEvents) {
    const pathFile = join(pathEvents, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory()) handlerEvents(client, join(dirEvents, file));

    if (extname(file) === ".ts") {
      const { event }: ImportEvent = await import(pathFile);
      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(null, client));
    }
  }
}

async function handlerCommands(
  client: Client,
  dirCommands: string = "../commands/"
): Promise<void> {
  const pathCommands = join(__dirname, dirCommands);
  const filesCommands = await readdir(pathCommands);

  for (const file of filesCommands) {
    const pathFile = join(pathCommands, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory())
      handlerCommands(client, join(dirCommands, file));

    if (extname(file) === ".ts") {
      const { command }: ImportCommand = await import(pathFile);
      client.commands.set(command.name, command);

      if (command.aliases?.length > 0) {
        command.aliases.forEach((alias: string) => {
          client.aliases.set(alias, command);
        });
      }
    }
  }
}

export async function handler(client: Client) {
  await handlerEvents(client);
  await handlerCommands(client);
}
