import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

require("dotenv").config();
const { CLIENT_ID: clientId, TOKEN: token, GUILD_ID: guildId } = process.env;

const comandos = [
  {
    name: "panel",
    description: "Crea un panel de control",
    options: [
      {
        name: "tipo",
        description: "Nombre del panel que desea crear",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "banear",
    description: "Banear a un usuario",
    options: [
      {
        name: "usuario",
        description: "Usuario que desea banear",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "razon",
        description: "Razon del baneo",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "expulsar",
    description: "Expulsar a un usuario",
    options: [
      {
        name: "usuario",
        description: "Usuario que desea expulsar",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "razon",
        description: "Razon de la expulsión",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "cerrar-ticket",
    description: "Cierra el ticket",
  },
  {
    name: "resena",
    description: "Crea una reseña",
    options: [
      {
        name: "estrellas",
        description: "Cantidad de estrellas",
        required: true,
        type: ApplicationCommandOptionType.Integer,
      },
      {
        name: "comentario",
        description: "Comentario de la reseña",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
];

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(token as string);
    await rest.put(
      Routes.applicationGuildCommands(clientId as string, guildId as string),
      {
        body: comandos,
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
