const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

  client.on("messageCreate", async (message) => {

    // Ignore bots
    if (message.author.bot) return;

    // Only DMs
    if (message.guild) return;

    const logChannel = await client.channels.fetch(process.env.DM_LOG_CHANNEL).catch(() => null);
    if (!logChannel) return;

    const content = message.content || "No text";
    const attachments = message.attachments.map(a => a.url).join("\n") || "None";

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("📩 New DM Received")
      .addFields(
        { name: "User", value: `${message.author.tag} (${message.author.id})` },
        { name: "Message", value: content },
        { name: "Attachments", value: attachments }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });

  });

};
