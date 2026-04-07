const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {

  client.on("messageCreate", async (message) => {

    console.log("Message event fired");

    // Ignore bots
    if (message.author.bot) return;

    // Only DMs
    if (message.guild) return;

    console.log("DM RECEIVED:", message.content);

    const logChannel = await client.channels.fetch(process.env.DM_LOG_CHANNEL).catch(err => {
      console.log("Channel fetch failed:", err);
      return null;
    });

    if (!logChannel) {
      console.log("Log channel not found");
      return;
    }

    const content = message.content || "No text";

    // ✅ FIXED attachments handling
    const attachments = message.attachments.size > 0
      ? message.attachments.map(a => a.url).join("\n")
      : "None";

    const embed = new EmbedBuilder()
      .setColor("#00AEEF")
      .setTitle("📩 New DM Received")
      .addFields(
        { name: "User", value: `${message.author.tag} (${message.author.id})` },
        { name: "Message", value: content },
        { name: "Attachments", value: attachments }
      )
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });

    console.log("Message sent to log channel");

  });

};
