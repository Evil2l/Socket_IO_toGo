const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{

    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id: '012',
                name: 'Jim',
                room: 'Private room'
            },
            {
                id:'002',
                name:'Matty',
                room: 'Cartoons room'
            },
            {
                id: '125',
                name: 'Rosa',
                room: 'Private room'
            }
        ];
    });

    it('should add new user',()=>{
        let users = new Users();
        let user = {
            id: '017',
            name: 'Andrew',
            room: 'Witcher 3'
        };
        let responseUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{
        let userId = '012';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', ()=>{
        let userId = '013';
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', ()=>{
        let userId = '002';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', ()=>{
        let userId = '001';
        let user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for Private course', ()=>{
        let userList = users.getUserList('Private room');

        expect(userList).toEqual(['Jim', 'Rosa']);


    });
    it('should return names for Private course', ()=>{
        let userList = users.getUserList('Cartoons room');

        expect(userList).toEqual(['Matty']);

    });
});