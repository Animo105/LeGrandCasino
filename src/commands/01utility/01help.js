const { EmbedBuilder } = require("@discordjs/builders")
const {prefix} = require('../../../config.json')

module.exports = {
    name: 'command',
    description: 'Send all chat command that arent for devs.',

    async execute(msg, client) {
        let embed = new EmbedBuilder()
        .setTitle("> **you called for help ?**")
        .setFooter({text:"*pour plus d'information, veuillez vous référer au manuel fourni en magasin."})
        .setColor([66, 245, 96]);


        let string = "préfixe pour les commandes:  **"+ prefix +"**\n les commandes marqué de :warning: sont désactivé.\n\n";

        client.chatCommands.forEach(element => {
            //si c'est pas une dev commande
            if (!element.dev){
    
                //si ca fait pas parti d'un groupe met le dans le main string
                     //précise si disabled
                    if (element.disabled) string += ":warning: "
    
                    //met le nom de la commande
                    string += "**" + prefix + element.name + "**";
                    //si il y a des options, affiche
                    if (element.options != undefined) string += " **"+element.options+"**";
                    //affiche la description
                    string += " => "+element.description+"\n";
            }  
        });

        embed.setDescription(string)
        msg.channel.send({embeds: [embed]})
    }
}