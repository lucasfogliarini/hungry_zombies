import { Template } from 'meteor/templating';

import { Developers } from '/api/developers/';

Template.developers.events({
  'submit .new-dev'(event) {
    event.preventDefault();
    const devIn = event.target.dev;
    Developers.insert(devIn.value);
    devIn.value = '';
  },
});
