import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

UI.registerHelper("admin", function (params) {
  var user = Meteor.user();
  var isAdmin = false;
  if(user != undefined && user.profile != undefined)
    isAdmin = user.profile.admin;

  if (params) {
    return isAdmin ? getHash(params, 't') : getHash(params, 'f');
  }
  return isAdmin;
});

UI.registerHelper("iif", function (params) {
  return getHash(params, 'c') ? getHash(params, 't') : getHash(params, 'f');
});

function getHash(params, hash) {
    return params ? params.hash[hash] : undefined;
}
