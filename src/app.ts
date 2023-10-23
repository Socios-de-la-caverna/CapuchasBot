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
 \u001b[32m╭────────────── Bot Survicraft ──────────────╮\u001b[36m╭───────── ¿Quieres un bot propio? ────────╮
 \u001b[32m│ Estado » desarrollo  Contrato » 14/10/2023 │\u001b[36m│    Si deseas tu propio bot de Discord,   │
 \u001b[32m│ Versión » 0.4        Entrega » null        │\u001b[36m│   página web, servidor Minecraft, logo,  │
 \u001b[32m╰────────────────────────────────────────────╯\u001b[36m│ etc. Contacta a los Socios de la caverna │
 \u001b[35m╭─────────── Creado por Anfitrion ───────────╮\u001b[36m│       https://discord.gg/nFHBs3vXc7      │
 \u001b[35m│                                            │\u001b[36m╰──────────────────────────────────────────╯
 \u001b[35m│  » https://github.com/aAnfitrion          │\u001b[33m╭────────── Creado para itzgabo_ ──────────╮
 \u001b[35m│ 󰑍 » https://www.reddit.com/user/Anfitrion_ │\u001b[33m│ Calidad de cliente »                │
 \u001b[35m│ 󰗃 » https://www.youtube.com/@anfitrion222  │\u001b[33m│ Contacto » https://discord.gg/ZvqUg2FYZA │
 \u001b[35m╰────────────────────────────────────────────╯\u001b[33m╰──────────────────────────────────────────╯
 \u001b[0m
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
