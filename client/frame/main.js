import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

UI.registerHelper("admin", function (param1, param2) {
  var user = Meteor.user();
  if(user != undefined && user.profile != undefined)
    return user.profile.admin;
});

UI.registerHelper("route_path", function () {
  return FlowRouter.getRouteName();
});
