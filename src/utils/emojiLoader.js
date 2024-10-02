const {testServ} = require('../../config.json')

module.exports = (client) => {
    console.log("loading emojis...")
    let emojis = new Map();
    
    client.guilds.cache.get(testServ).emojis.cache.map(emoji => {
        //create a map with each emoji
        emojis.set(emoji.name, `<:${emoji.name}:${emoji.id}>`);
    });

    return emojis
}