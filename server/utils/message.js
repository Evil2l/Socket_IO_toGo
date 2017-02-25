let moment = require('moment');

let generateMessage =  (author, text)=>{
    return {
        author,
        text,
        createdAt: moment().valueOf()
    }
};

let generateLocationMessage = (author, lat, lon)=>{
    return {
        author,
        url: `https://google.com/maps?q=${lat},${lon}`,
        createdAt: moment().valueOf()
    }
};

// module.exports.generateMessage = generateMessage;
//ES6 syntax
module.exports = {generateMessage, generateLocationMessage};