const { readdir, stat } = require("fs/promises");
const { join, extname } = require("path");
const Client = require(".");

/**
 *
 * @param {Client} client
 * @param {Object} statut
 */
function pushStatut(client, statut) {
  client.status.push(statut);
}

/**
 *
 * @param {Client} client
 * @param {String} pathEvents
 */
async function handlerEvents(client, dirEvents = "../events/") {
  const pathEvents = join(__dirname, dirEvents);
  const filesEvents = await readdir(pathEvents);

  for (const file of filesEvents) {
    const pathFile = join(pathEvents, file);
    const fileStat = await stat(pathFile);

    if (fileStat.isDirectory()) handlerEvents(client, join(dirEvents, file));

    if (extname(file) === ".js") {
      const event = require(pathFile);

      if (!event.name || !event.run)
        pushStatut(client, {
          type: "Event",
          fichier: file,
          name: event.name ? event.name : undefined,
          statut: "Error",
        });
      else {
        try {
          client.events.set(event.name, event);
          client.on(event.name, event.run.bind(null, client));
          pushStatut(client, {
            type: "Event",
            fichier: file,
            name: event.name,
            statut: "Success",
          });
        } catch (err) {
          console.log(err);
          pushStatut(client, {
            type: "Event",
            fichier: file,
            name: event.name ? event.name : undefined,
            statut: "Error",
          });
        }
      }
    }
  }
}

/**
 *
 * @param {Client} client
 * @param {String} pathCommands
 */
async function handlerCommands(client, dirCommands = "../commands/") {
  const pathCommands = join(__dirname, dirCommands);
  const filesCommands = await readdir(pathCommands);

  for (const file of filesCommands) {
    const pathFile = join(pathCommands, file);
    const fileStat = await stat(pathFile);

    if (fileStat.isDirectory())
      handlerCommands(client, join(dirCommands, file));

    if (extname(file) === ".js") {
      const command = require(pathFile);

      if (!command.name || !command.run)
        pushStatut(client, {
          type: "Command",
          fichier: file,
          name: command.name ? command.name : undefined,
          statut: "Error",
        });
      else {
        try {
          client.commands.set(command.name, command);
          if (command.aliases?.length > 0) {
            command.aliases.forEach((alias) => {
              client.aliases.set(alias, command);
            });
          }
          pushStatut(client, {
            type: "Command",
            fichier: file,
            name: command.name,
            statut: "Success",
          });
        } catch (err) {
          console.log(err);
          pushStatut(client, {
            type: "Command",
            fichier: file,
            name: command.name ? command.name : undefined,
            statut: "Error",
          });
        }
      }
    }
  }
}

/**
 *
 * @param {Client} client
 */
module.exports = async function handler(client) {
  await handlerEvents(client);
  await handlerCommands(client);
};
