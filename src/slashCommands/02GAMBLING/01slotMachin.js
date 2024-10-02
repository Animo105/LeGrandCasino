const { SlashCommandBuilder} = require("discord.js");
const slotInfo = require("../../subCommands/slot-info");
const slotRoll = require("../../subCommands/slot-roll");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slotmachine")
        .setDescription("Slot machine.")
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName("roll")
            .setDescription("Take a try to the slot machine. (cost 100$)")
        )
        .addSubcommand(subcommand => subcommand
            .setName("info")
            .setDescription("Give info on your slot machine stat.")
        ),
    
    async execute(interaction, client) {
        await interaction.deferReply()

        if (interaction.options.getSubcommand() === 'info') {
            console.log("     [SLOT] subcommand 'info'.")
            await slotInfo(interaction,client);
        }
        else if (interaction.options.getSubcommand() === 'roll') {
            console.log("     [SLOT] subcommand 'roll'.")
            await slotRoll(interaction,client);
        }
        else {
            interaction.editReply("Oupsi, you're not suppose to see that... well, eh.")
        }
    }
}