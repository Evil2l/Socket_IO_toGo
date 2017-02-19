let generateMessage =  (author, text)=>{
    return {
        author,
        text,
        createdAt: new Date().getTime()
    }
};

module.exports.generateMessage = generateMessage;