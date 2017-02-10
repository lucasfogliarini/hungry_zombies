import { Template } from 'meteor/templating';

import { Restaurants } from '/api/restaurants/';

Template.restaurants.events({
  'submit .add-restaurant'(event) {
    event.preventDefault();
    const restaurantIn = event.target.restaurant;
    Restaurants.insert(restaurantIn.value);
    restaurantIn.value = '';
  },
  'click .remove-rest'() {
    Restaurants.remove(this._id)
  }
});
Template.restaurants.helpers({
  restaurants(){
    return Restaurants.scores();
  }
});
