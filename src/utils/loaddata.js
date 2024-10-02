const fs = require('fs');
const {botId} = require('./../../config.json')

module.exports = (id, guildId) => {
    
    if (id === botId) {
        const jsonData = fs.readFileSync(`src/01database/0wner.json`);
        return JSON.parse(jsonData);
    }


    if (fs.existsSync(`src/01database/${guildId}-${id}.json`)) {
        const jsonData = fs.readFileSync(`src/01database/${guildId}-${id}.json`);
        return JSON.parse(jsonData);
    }
    else {
            return undefined;
    }
}