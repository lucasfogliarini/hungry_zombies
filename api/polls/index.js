import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';
import { Restaurants } from '/api/restaurants/';

//api
class PollsCollection extends BaseCollection {
    vote(username, restaurant_id) {
      var voted = voted(username, restaurant_id);
      if(voted){
        return super.insert({
          username: username,
          restaurant_id: restaurant_id,
          createdAt: new Date(),
        });
      }
    }
    voted(username, restaurant_id) {
      var found = super.findOne({username: username, restaurant_id: restaurant_id});
      console.log(found);
      return found;
    }
    todayPoll(){
      var self = this;
      return Restaurants.find().map(function(restaurant){
         var votes = self.votesToday(restaurant);
         return {
           restaurant_id: restaurant._id,
           restaurant_name: restaurant.name,
           votes: votes
         };
      });
    }
    votesToday(restaurant){
      super.find({ restaurant_id: restaurant._id }).map(function(poll) {
         var votedToday = poll.toDateString() == new Date().toDateString();
         if(votedToday) return poll.username;
      });
    }
}
export const Polls = new PollsCollection('polls');

//schema
Polls.schema = new SimpleSchema({
  username: {
    type: String,
  },
  restaurant_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Polls.attachSchema(Polls.schema);
