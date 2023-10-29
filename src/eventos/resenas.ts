import { CommandInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";
import { parse } from "dotenv";

require("dotenv").config();
const canalResenasId = process.env.CANAL_RESENAS as string;

export default async function resena(
  interaction: CommandInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.commandName !== "resena") return;
  if (interaction.channelId !== canalResenasId) return;

  const autor = await interaction.guild?.members.fetch(interaction.user.id);
  const cantidadEstrellas = interaction.options.get("estrellas")
    ?.value as string;
  const estrellas = () => {
    let string = "";
    for (let i = 0; i < parseInt(cantidadEstrellas); i++) {
      string += "⭐";
    }
    return string;
  };
  const comentario = interaction.options.get("comentario")?.value as string;

  if (parseInt(cantidadEstrellas) > 5) {
    return interaction.reply({
      content: "No puedes poner más de 5 estrellas",
      ephemeral: true,
    });
  }

  const embed = simpleCord
    .crearEmbed()
    .setAuthor({
      name: autor?.user.username as string,
      iconURL: autor?.user.avatarURL() as string,
    })
    .setDescription(comentario)
    .setFooter({
      text: estrellas(),
    });

  interaction.reply({
    embeds: [embed],
  });
}
