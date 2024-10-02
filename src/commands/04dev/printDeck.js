module.exports = {
    name: "printdeck",
    description:"print all card left in the deck",
    dev:true,
    execute(msg,client) {
        
        if (!client.checkperm(msg)) {
            return;
        }

        if (client.deck == undefined) {
            msg.channel.send("I don't have any cards");
            return;
        }

        client.deck.print(msg.channel);

    }
}