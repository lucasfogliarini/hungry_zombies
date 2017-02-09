import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
    create_admin();
});

function create_admin(){
    var exists = Accounts.findUserByUsername('facilitador');
    if(!exists){
      Accounts.createUser({
        username: 'facilitador',
        password: '123456',
        profile: { admin: true }
      });
      Meteor.users.allow({
        remove() { return true; },
      });
    }
}
