import {
    SlashCommandBuilder,
    PermissionFlagsBits,
} from "discord.js";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("clean")
        .setDescription("Delete messages from this channel")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Number of messages to delete")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        ),

    async execute(interaction) {
        const amount = interaction.options.getInteger("amount");

        if (!interaction.member.permissions.has(
            PermissionFlagsBits.ManageMessages
        )) {
            return interaction.reply({
                content: "❌ You need **Manage Messages** permission to use this command.",
                ephemeral: true,
            });
        }

        if (!interaction.channel?.isTextBased()) {
            return interaction.reply({
                content: "❌ This command can only be used in a text channel.",
                ephemeral: true,
            });
        }

        try {
            const deleted = await interaction.channel.bulkDelete(
                amount,
                true
            );

            await interaction.reply({
                content: `🧹 Deleted **${deleted.size}** message${deleted.size === 1 ? "" : "s"}.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error("Clean command error:", error);

            if (interaction.replied || interaction.deferred) {
                return;
            }

            await interaction.reply({
                content:
                    "❌ I couldn't delete those messages. Messages older than 14 days cannot be bulk deleted.",
                ephemeral: true,
            });
        }
    },
};
