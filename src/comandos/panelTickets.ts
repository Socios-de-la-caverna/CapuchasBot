import { ButtonStyle, CommandInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

export default async function panelTickets(
  interaction: CommandInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.commandName !== "panel") return;
  if (interaction.options.get("tipo")?.value !== "tickets") return;
  const autor = await interaction.guild?.members.fetch(interaction.user.id);
  if (!autor?.permissions.has("Administrator")) {
    return interaction.reply({
      content: "No tienes permiso para ejecutar este comando",
      ephemeral: true,
    });
  }

  const embedPanelTickets = simpleCord
    .crearEmbed()
    .setTitle("🖐 Soporte")
    .setThumbnail((await interaction.guild?.iconURL()) as string)
    .setDescription(
      `
      Bienvenido al panel de tickets, aquí podrás crear un ticket para que el staff te ayude con tu problema o solicitud.
    `
    );

  const seleccionPanelTickets = simpleCord.crearListaDeSeleccion({
    idPersonalizado: "panel-tickets",
    espacioReservado: "Selecciona un departamento",
    opciones: [
      {
        etiqueta: "Contratanos",
        descripcion: "Solicita nuestros servicios",
        valor: "contratanos",
        emoji: "📝",
      },
      {
        etiqueta: "Reporte",
        descripcion: "Reporta a un usuario",
        valor: "reporte",
        emoji: "👮",
      },
      {
        etiqueta: "Staff",
        descripcion: "Solicita ser staff del servidor",
        valor: "staff",
        emoji: "👨‍🔧",
      },
      {
        etiqueta: "Aplicar para socio",
        descripcion: "Solicita ser socio parte de este estudio",
        valor: "socio",
        emoji: "👨‍💼",
      },
    ],
  });

  interaction.reply({
    embeds: [embedPanelTickets],
    components: [seleccionPanelTickets],
  });
}
