import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';
import { Polls } from '/api/polls/';

//api
class RestaurantsCollection extends BaseCollection {
  insert(name) {
    return super.insert({
      name: name,
      createdAt: new Date(),
    });
  }
}
export const Restaurants = new RestaurantsCollection('restaurants');

//schema
Restaurants.schema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Restaurants.attachSchema(Restaurants.schema);
