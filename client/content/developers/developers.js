import { Template } from 'meteor/templating';

import { Developers } from '/api/developers/';

Template.developers.events({
  'click .remove-dev'() {
    Developers.remove(this._id)
  }
});

Template.developers.helpers({
  developers: function(){
   return Meteor.users.find();
  }
});
