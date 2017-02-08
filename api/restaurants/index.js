import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Restaurants.attachSchema(Restaurants.schema);
