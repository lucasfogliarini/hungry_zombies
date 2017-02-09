import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';
import { Restaurants } from '/api/restaurants/';

//api
class PollsCollection extends BaseCollection {
    vote(username, restaurant_id) {
      var voted = this.user_voted();
      if(!voted){
        return super.insert({
          username: username,
          restaurant_id: restaurant_id,
          createdAt: new Date(),
        });
      }
    }
    user_voted() {
      var self = this;
      var voted = false;
      var username = Meteor.user().username;
      super.find().forEach(function(poll){
        if(self.votedToday(poll) && poll.username == username)
           voted = true;
      });;
      return voted;
    }
    votedToday(poll){
      return poll.createdAt.toDateString() == new Date().toDateString();
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
      //console.log(super.find().fetch(),super.find({ restaurant_id: restaurant._id }).fetch(), restaurant._id);
      return super.find({ restaurant_id: restaurant._id }).map(function(poll) {
         if(votedToday(poll)) return poll.username;
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
