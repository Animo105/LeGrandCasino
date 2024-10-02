const { EmbedBuilder } = require("@discordjs/builders");
const {SlashCommandBuilder } = require("discord.js");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Give info on your account.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Give information about another user.")
    ),

    async execute(interaction, client) {

        await interaction.deferReply();

        let user = interaction.options.getUser('user') ?? interaction.user;
        
        let data = client.checkAccount(user.id, interaction.guildId)

        if (data) {
            
            /*======Build the embed=====*/
            let embed = new EmbedBuilder()
                .setTitle(data.name)
                .setColor([201, 18, 18])
                .setFooter({text:`Membership: ${data.membership}`})
                .setDescription(`${data.desc}\n\nIn account: ${data.money}$`);

            await interaction.editReply({embeds: [embed]});
            /*==========================*/
        }
        else {
            await interaction.editReply("There's no account registered under that name.");
            console.log(user.id);
        }
        
        
    }
}