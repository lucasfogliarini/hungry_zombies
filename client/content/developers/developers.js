import { Template } from 'meteor/templating';

import { Developers } from '/api/developers/';

Template.developers.events({
  'submit .add-dev'(event) {
    event.preventDefault();//no blink
    const devIn = event.target.dev;
    Developers.insert(devIn.value);
    devIn.value = '';
  },
  'click .remove-dev'() {
    Developers.remove(this._id)
  }
});

Template.developers.helpers({
  developers: function(){
   return Developers.find();
  }
});
