import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
    create_admin();
});

function create_admin(){
    var exists = Accounts.findUserByUsername('lucasfogliarini');
    if(!exists){
      Accounts.createUser({
        username: 'lucasfogliarini',
        password: '12345',
        profile: { admin: true }
      });
    }
}
