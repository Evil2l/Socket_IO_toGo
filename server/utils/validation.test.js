const expect = require('expect');

const {isRealString} = require('./validation');

describe('validation', ()=>{

    it('should reject non-string values', ()=>{
        let result = isRealString(45);

        expect(result).toBe(false);
    });

    it('should reject string with only spaces', ()=>{
        let result = isRealString("     ");

        expect(result).toBe(false);
    });

    it('should allow string with non-space', ()=>{
            let result = isRealString("   German  ");

            expect(result).toBe(true);
    });

});