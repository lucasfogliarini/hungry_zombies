import { Meteor } from 'meteor/meteor';

UI.registerHelper("admin", function (param1, param2) {
  var user = Meteor.user();
  if(user != undefined)
    return user.profile.admin;
});
