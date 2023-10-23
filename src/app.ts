import { Client, GatewayIntentBits } from "discord.js";
import SimpleCord from "./lib/SimpleCord";
import panelTickets from "./comandos/panelTickets";
import expulsar from "./comandos/expulsar";
import banear from "./comandos/banear";
import crearTicket from "./eventos/crearTicket";
import cerrarTicket from "./eventos/cerrarTicket";
import reabrirTicket from "./eventos/reabrirTicket";
import eliminarTicket from "./eventos/eliminarTicket";
import transcribirTicket from "./eventos/transcribirTicket";
import autoRol from "./eventos/autoRol";

require("dotenv").config();
const { TOKEN: token } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(token);

client.on("ready", () => {
  console.log(`
  \u001b[35m╭─────────── Creado por Anfitrion ───────────╮
  \u001b[35m│                                            │
  \u001b[35m│  » https://github.com/aAnfitrion          │
  \u001b[35m│ 󰑍 » https://www.reddit.com/user/Anfitrion_ │
  \u001b[35m│ 󰗃 » https://www.youtube.com/@anfitrion222  │
  \u001b[35m╰────────────────────────────────────────────╯
  `);
});

const simpleCord = new SimpleCord()
  .setColor("#2fd8de")
  .setImagen(
    "https://cdn.discordapp.com/attachments/1121098388583227554/1121843021894393926/image.psds.png"
  );

client.on("guildMemberAdd", (member) => {
  autoRol(member);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand()) {
    panelTickets(interaction, simpleCord);
    expulsar(interaction, simpleCord);
    banear(interaction, simpleCord);
  }
  if (interaction.isStringSelectMenu()) {
    crearTicket(interaction, simpleCord);
  }
  if (interaction.isButton()) {
    reabrirTicket(interaction);
    eliminarTicket(interaction, simpleCord);
    transcribirTicket(interaction, simpleCord);
  }
  cerrarTicket(interaction, simpleCord);
});
