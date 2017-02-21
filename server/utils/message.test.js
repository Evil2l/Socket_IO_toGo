// expect testing module
const expect = require('expect');
// ES6 method declaration from the other module;
const {generateMessage} = require('./message');

// this functional block'll separate tests and give name it in the console
describe('generateMessage',()=>{

    it('should generate correct message object ',()=>{
        let author = 'Beam';
        let text = 'Closer look';
        let result = generateMessage(author, text);

        expect(result.createdAt)
            .toBeA('number', `Expected number type, but got ${typeof result}`);
        expect(result.author).toBe(author);
        expect(result.text).toBe(text);
        // .toInclude use for check if object have props
        expect(result).toInclude({
            author,
            text
        })
    });
});

