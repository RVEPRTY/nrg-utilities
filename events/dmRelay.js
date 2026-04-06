const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    try {
      // Ignore bots
      if (message.author.bot) return;

      // Only DMs
      if (message.guild) return;

      console.log("DM received from:", message.author.tag);

      const logChannel = await client.channels.fetch(process.env.DM_LOG_CHANNEL).catch(() => null);
      if (!logChannel) {
        console.log("DM log channel not found");
        return;
      }

      const embed = new EmbedBuilder()
        .setColor("#00AEEF")
        .setTitle("📩 New Support DM")
        .addFields(
          { name: "User", value: `${message.author.tag}` },
          { name: "User ID", value: message.author.id },
          { name: "Message", value: message.content || "No text" }
        )
        .setTimestamp();

      if (message.attachments.size > 0) {
        embed.addFields({
          name: "Attachments",
          value: message.attachments.map(a => a.url).join("\n")
        });
      }

      logChannel.send({ embeds: [embed] });

    } catch (err) {
      console.error("DM Relay Error:", err);
    }
  });
};
