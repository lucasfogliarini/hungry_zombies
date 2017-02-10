import { Accounts } from 'meteor/accounts-base'
import { Restaurants } from '/api/restaurants/';

Meteor.startup(() => {
    seed_users();
});

function seed_users(){
    //facilitador
    var exists = Accounts.findUserByUsername('facilitador');
    if(!exists){
      Accounts.createUser({
        username: 'facilitador',
        password: '123456',
        profile: { admin: true }
      });
    }

    //dev1
    var exists = Accounts.findUserByUsername('dev1');
    if(!exists){
      Accounts.createUser({
        username: 'dev1',
        password: '123456'
      });
    }

    //dev2
    var exists = Accounts.findUserByUsername('dev2');
    if(!exists){
      Accounts.createUser({
        username: 'dev2',
        password: '123456'
      });
    }

    //dev3
    var exists = Accounts.findUserByUsername('dev3');
    if(!exists){
      Accounts.createUser({
        username: 'dev3',
        password: '123456'
      });
    }
}
