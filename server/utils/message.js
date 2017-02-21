let generateMessage =  (author, text)=>{
    return {
        author,
        text,
        createdAt: new Date().getTime()
    }
};

// module.exports.generateMessage = generateMessage;
//ES6 syntax
module.exports = {generateMessage};