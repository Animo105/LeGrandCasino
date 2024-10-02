const {botId} = require('./../../config.json')
const fs = require('fs');

module.exports = (data, id, guildId) => {

    let jsonData = JSON.stringify(data);

    if (id === botId) {
        fs.writeFileSync(`src/01database/0wner.json`, jsonData)
        return true;
    }


    if (fs.existsSync(`src/01database/${guildId}-${id}.json`)) {
        fs.writeFileSync(`src/01database/${guildId}-${id}.json`, jsonData);
        return true;
    }
    else {
        return false;
    }
}