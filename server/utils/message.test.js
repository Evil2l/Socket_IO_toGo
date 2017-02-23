// expect testing module
const expect = require('expect');
// ES6 method declaration from the other module;
const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

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
describe('generateLocationMessage', ()=>{
    it('should genereate correct location object', ()=>{
        let from = 'Your location';
        let lat = 45;
        let lon = 33;
        let url = `https://google.com/maps?q=45,33`;
        let result = generateLocationMessage(from, lat, lon);

        expect(result.createdAt)
            .toBeA('number', `Expected number type, but got ${typeof result}`);
        expect(result.from).toBe(from);
        expect(result.url).toBeA('string', `Expected string type, but got ${typeof result}`);
        expect(result).toInclude({
            from,
            url
        })
    });
});

