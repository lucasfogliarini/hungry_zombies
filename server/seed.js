import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
    create_users();
});

function create_users(){
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

function create_restaurants(){
    //restaurant1
    var exists = Accounts.findUserByUsername('restaurant1');
    if(!exists){
      Accounts.createUser({
        name: 'restaurant1',
      });
    }

    //restaurant2
    var exists = Accounts.findUserByUsername('restaurant2');
    if(!exists){
      Accounts.createUser({
        name: 'restaurant2'
      });
    }

    //restaurant3
    var exists = Accounts.findUserByUsername('restaurant3');
    if(!exists){
      Accounts.createUser({
        name: 'restaurant3'
      });
    }
}
