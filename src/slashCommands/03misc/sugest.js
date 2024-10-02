const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("suggest an item to add in the shop (temporary)")
        .addStringOption(option => option
            .setName("item").setDescription("give the name of the item, with a description of what it should do.")
            .setMaxLength(500).setRequired(true)
        ),

    async execute(interaction, client) {
        await interaction.deferReply();



        let ideaJson = fs.readFileSync('src/01database/shop.json');
        let idea = JSON.parse(ideaJson)
        idea.shop.push(interaction.options.getString('item'));
        
        let jsonData = JSON.stringify(idea);

        fs.writeFileSync(`src/01database/shop.json`, jsonData);

        interaction.editReply({content:"Thanks for the idea.", ephemeral:true})


        
    }
}