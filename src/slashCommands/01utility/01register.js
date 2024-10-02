const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Create a account at the great casino. (you can only have one, pre-existing one will be deleted)")
        .addStringOption(option => option
            .setName("description")
            .setDescription("A small description of your account. (optional)")
            .setMaxLength(100)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        var data = {
            name:interaction.user.displayName,
            desc:interaction.options.getString('description') ?? '',

            money:100,
            spent:0,

            membership:'none',

            achivement:[],
            intentory:[],

            //object {name:"", count:"", desc:""}

            SM:{time:0, moneyIn:0, moneyOut:0, jackpot:0},
            FR:{time:0, moneyIn:0, moneyOut:0},
            poker:{time:0, moneyIn:0, moneyOut:0},
            mug:{time:0},

            donation:{given:0, recived:0}
            
        }
        var jsonData = JSON.stringify(data);

        try {
            await fs.writeFileSync(`src/01database/${interaction.guildId}-${interaction.user.id}.json`, jsonData);
        } catch (error) {
            console.log(error);
            await interaction.editReply("Something went wrong.");
            return;
        }
        await interaction.editReply("You have been registed. Welcome to the Grand Casino.");


    }
}