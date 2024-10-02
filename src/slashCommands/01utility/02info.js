const { EmbedBuilder } = require("@discordjs/builders");
const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
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

        if (!data) {
            await interaction.editReply("There's no account registered under that name.");
            console.log(user.id);
        }

            let embed = []
            /*======Build the embed=====*/

            //main embed
            embed.push(  new EmbedBuilder()
                .setTitle(data.name)
                .setColor([201, 18, 18])
                .setFooter({text:`Membership: ${data.membership}`})
                .setDescription(`${data.desc}\n\nIn account: ${data.money}$`)
            )
            /*==========================*/

            //slot machine embed
            embed.push( new EmbedBuilder()
                .setTitle(`${data.name} [Slot machine] `).setFooter({text:`Time used: ${data.SM.time}`}).setColor([201, 18, 18])
                .setDescription(`**Money put in:** ${data.SM.moneyIn} \n **Money cashed out:** ${data.SM.moneyOut} \n **Profit:** ${data.SM.moneyOut - data.SM.moneyIn} \n **Jackpot:** ${data.SM.jackpot}`)
            )
            /*==========================*/

            //roulette
            embed.push( new EmbedBuilder()
            .setTitle(`${data.name} [French roulette] `).setFooter({text:`Time used: ${data.FR.time}`}).setColor([201, 18, 18])
            .setDescription(`**Money put in:** ${data.FR.moneyIn} \n **Money cashed out:** ${data.FR.moneyOut} \n **Profit:** ${data.SM.moneyOut - data.SM.moneyIn}`)
        )




            //===============================Build the button and the row================================================//
            let index = 0;
            let next = new ButtonBuilder().setCustomId('next').setLabel("Next ▶️")
            .setStyle(ButtonStyle.Primary)
            
            let previous = new ButtonBuilder().setCustomId('back').setLabel("◀️ Previous")
            .setStyle(ButtonStyle.Primary)

            const row = new ActionRowBuilder()
			.addComponents(previous, next);


            //send message
            const response = await interaction.editReply({
                embeds: [embed[0]],
                components: [row]
            });

            //build collector
            const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300_000 });

            collector.on('collect', async i => {
                i.deferUpdate();
                if (i.customId == 'next') {
                    index += 1;
                    if (index > (embed.length-1)) index = (embed.length-1);
                }
                else if (i.customId == 'back') {
                    index -= 1;
                    if (index < 0) index = 0;
                    
                }
                else console.log("[ERROR] wrong /info interaction:",i.customId)
                console.log("[info] index:", index);
                await interaction.editReply({
                    embeds: [embed[index]],
                    components: [row]
                });

            });
    }
}