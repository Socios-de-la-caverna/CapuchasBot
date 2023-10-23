import { ButtonStyle, StringSelectMenuInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

require("dotenv").config();
const categoriaTickets = process.env.CATEGORIA_TICKETS as string;
const rolStaff = process.env.ROL_STAFF as string;

export default async function crearTicket(
  interaction: StringSelectMenuInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.customId !== "panel-tickets") return;

  let canalTicketNombre = "";
  let tituloEmbed = "";
  let descripcionEmbed = "";

  switch (interaction.values[0]) {
    case "contratanos":
      canalTicketNombre = "📝︙contratanos-";
      tituloEmbed = "Solicitud de contratación";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "reporte":
      canalTicketNombre = "👮︙reporte-";
      tituloEmbed = "Reporte de usuario";
      descripcionEmbed =
        "Describe el reporte que quieres hacer. Por favor, se lo más específico posible. Si es posible, incluye capturas de pantalla.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "staff":
      canalTicketNombre = "👨‍🔧︙staff-";
      tituloEmbed = "Solicitud de staff";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "socio":
      canalTicketNombre = "👨‍💼︙socio-";
      tituloEmbed = "Solicitud de socio";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    default:
      break;
  }

  const canalTicket = await simpleCord.crearTicket(
    interaction,
    categoriaTickets,
    canalTicketNombre,
    rolStaff
  );

  const embedTicket = simpleCord
    .crearEmbed()
    .setTitle(tituloEmbed)
    .setDescription(descripcionEmbed);

  const embedBotones = simpleCord.crearBoton([
    {
      etiqueta: "Cerrar ticket",
      emoji: "🔒",
      idPersonalizado: "cerrar-ticket",
      estilo: ButtonStyle.Danger,
    },
  ]);

  canalTicket?.send({
    content: `<@${interaction.user.id}>`,
    embeds: [embedTicket],
    components: [embedBotones],
  });
}
