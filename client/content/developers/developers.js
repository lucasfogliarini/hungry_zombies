import { Template } from 'meteor/templating';

Template.developers.helpers({
  developers(){
   return Meteor.users.find();
  }
});
