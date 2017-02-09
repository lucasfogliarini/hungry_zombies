import { Template } from 'meteor/templating';

Template.developers.events({
  'click .remove-dev'() {
    Meteor.users.remove(this._id)
  }
});

Template.developers.helpers({
  developers: function(){
   return Meteor.users.find();
  }
});
