```js
import {
    SlashCommandBuilder,
    PermissionFlagsBits,
} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("clean")
        .setDescription("Delete messages from this channel")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("How many messages to delete")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        ),

    async execute(interaction) {
        const amount = interaction.options.getInteger("amount");

        if (!interaction.memberPermissions?.has(
            PermissionFlagsBits.ManageMessages
        )) {
            return interaction.reply({
                content: "❌ You need the **Manage Messages** permission to use this command.",
                ephemeral: true,
            });
        }

        try {
            const deleted = await interaction.channel.bulkDelete(
                amount,
                true
            );

            await interaction.reply({
                content: `🧹 Cleaned **${deleted.size}** message${deleted.size === 1 ? "" : "s"}.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error("Clean command error:", error);

            await interaction.reply({
                content:
                    "❌ I couldn't delete the messages. Make sure I have **Manage Messages** permission.",
                ephemeral: true,
            });
        }
    },
};
```
