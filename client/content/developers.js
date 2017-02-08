import { Template } from 'meteor/templating';

import { Developers } from '/api/developers/';

Template.developers.events({
  'submit .new-dev'(event) {
    event.preventDefault();
    Developers.insert({
      name: event.target.dev.value,
      createdAt: new Date(),
    });

    target.dev.value = '';
  },
});
