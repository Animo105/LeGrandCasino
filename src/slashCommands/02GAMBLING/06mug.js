const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {botId} = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mug")
        .setDescription("description")
        .addSubcommand(subcommand => subcommand
            .setName("shoot").setDescription("Select a user and shoot. use info for more info.")
            .addUserOption(option => option
                .setName("user").setDescription("Another user.").setRequired(true)
            )
            .addIntegerOption(option => option
                .setName("amount").setDescription("Amount you risk (100, 200, 300)").setRequired(true)
                .addChoices(
                    {name:"100", value:100},
                    {name:"200", value:200},
                    {name:"300", value:300}
                )
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("info").setDescription("Give info on how to mug people (and the consequencies).")
        ),

    async execute(interaction, client) {
        await interaction.deferReply();

        if (interaction.options.getSubcommand() === 'info') {
            //===========================display an embed================================================================
            let embed = new EmbedBuilder()
                .setTitle("=================== [MUG] ===================")
                .setDescription("Try to mug another user. \n Your gun only has one bullet and you have a 1 in 8 chance to hit your target. \n Be careful because if you fail, you'll have to pay up. ")
                .setColor([201, 18, 18]);
            
            interaction.editReply({embeds: [embed]});
        }
        else {
            //===========================make a shot==============================================================
            let data = client.checkAccount(interaction.user.id, interaction.guildId);
            if (!data) {
                interaction.editReply("There's no account registered under your name.")
                return;
            }

            let bid = interaction.options.getInteger('amount');

            if (data.money < 0) {
                interaction.editReply("You don't have the money.");
                return;
            }

            let user = interaction.options.getUser('user');

            //check if shooting yourself
            if (user.id === interaction.user.id) {
                interaction.editReply("Mugging yourself now <@${interaction.user.id}>? You should go to the hospital.")
                return;
            }

            let otherdata = client.checkAccount(user.id, interaction.guildId);
            if (!otherdata) {
                interaction.editReply("There's no account registered under that name.")
                return;
            }



            //take a shot

            //si tu mug le dealer, instant death
            if (user.id == botId) {
                interaction.editReply(`Nice try <@${interaction.user.id}> but they trained me for this. I suggest you check your account before doing anything more stupid.`)
                data.money -= 1000;
                client.saveData(data, interaction.user.id, interaction.guildId);
            }
            else {

                let chance = Math.floor(Math.random()*8);
                if (chance == 1) {
                    if (otherdata.money < bid) {
                    bid = otherdata;
                    }
                    interaction.editReply(`__**BANG!**__ <@${interaction.user.id}> shot <@${user.id}>, stealing ${bid}$ in their account.`)
                    otherdata.money -= bid;
                    data.money += bid;
                    data.mug.amount += bid;
                }
                else {
                    interaction.editReply(`*click...* <@${interaction.user.id}> failed to shoot <@${user.id}>. Gotta pay up now ( ${user.displayName} gain ${bid}$)`);
                    data.money -= bid;
                    otherdata.money += bid;
                }

                data.mug.time += 1;

                client.saveData(data, interaction.user.id, interaction.guildId);
                client.saveData(otherdata, user.id, interaction.guildId);
            }
        }


        
    }
}