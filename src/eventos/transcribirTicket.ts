import { ButtonInteraction, TextBasedChannel } from "discord.js";
import discordTranscripts from "discord-html-transcripts";
import SimpleCord from "../lib/SimpleCord";

require("dotenv").config();
const rolStaff = process.env.ROL_STAFF as string;
const canalRegistrosTicketsId = process.env.CANAL_REGISTROS_TICKETS as string;

export default async function transcribirTicket(
  interaction: ButtonInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.customId !== "transcribir-ticket") return;

  const autor = await interaction.guild?.members.fetch(interaction.user.id);
  if (
    !autor?.roles.cache.has(rolStaff) &&
    !autor?.permissions.has("Administrator")
  ) {
    return interaction.reply({
      content: "No tienes permiso para ejecutar este comando",
      ephemeral: true,
    });
  }

  /*   const canalTicket = await interaction.guild?.channels.fetch(
    interaction.channel?.id as string
  );

  const transcripcion = await discordTranscripts.createTranscript(
    canalTicket as TextBasedChannel,
  );

  const canalRegistrosTickets = (await interaction.guild?.channels.fetch(
    canalRegistrosTicketsId
  )) as TextBasedChannel;

  canalRegistrosTickets.send({
    content: `Transcripción del ticket **[${canalTicket?.name}]**`,
    files: [transcripcion],
  });
 */
  const embed = simpleCord
    .crearEmbed()
    .setTitle("Esta función aun no esta disponible");

  interaction.reply({
    embeds: [embed],
  });
}
