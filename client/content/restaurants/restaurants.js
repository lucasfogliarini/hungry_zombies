import { Template } from 'meteor/templating';

import { Restaurants } from '/api/restaurants/';

Template.restaurants.events({
  'submit .new-restaurant'(event) {
    event.preventDefault();
    const restaurantIn = event.target.dev;
    Restaurants.insert(restaurantIn.value);
    restaurantIn.value = '';
  },
});
