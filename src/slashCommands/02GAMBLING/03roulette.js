const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roulette")
        .setDescription("take a try to the french roulette.")
        .addSubcommand(subcommand => subcommand
            .setName("roll")
            .setDescription("take a try to the french roulette. see roulette info before to know how it works.")
            .addIntegerOption(option => option
                .setName("number").setDescription("bet on a number (0 - 36)")
                .setMinValue(0).setMaxValue(36)
            )
            .addStringOption(option => option
                .setName("color").setDescription("bet on a color (black or red)")
                .addChoices(
                    {name:"Black", value:"black"},
                    {name:"Red", value:"red"}
                )
            )
            .addStringOption(option => option
                .setName("type").setDescription("'type' of the number (even or odd)")
                .addChoices(
                    {name:"Even", value:"even"},
                    {name:"Odd", value:"odd"}
                )
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("info")
            .setDescription("display information about french roulette.")
        ),
    test:true,
    async execute(interaction, client) {
        await interaction.deferReply();

        let data = client.checkAccount(interaction.user.id, interaction.guildId);
        if (!data) {
            interaction.editReply("There's no account registered under that name.")
            return;
        }
        await interaction.editReply("Not ready yet. come back another time.")
        //==============================================================================
        

        
    }
}