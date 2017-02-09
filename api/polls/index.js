import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';
import { Restaurants } from '/api/restaurants/';

//api
class PollsCollection extends BaseCollection {
    vote(username, restaurant_id) {
      var can_vote = this.can_vote();
      if(can_vote){
        return super.insert({
          username: username,
          restaurant_id: restaurant_id,
          createdAt: new Date(),
        });
      }
    }
    can_vote() {
      var self = this;
      var can_vote = false;
      if (Meteor.userId()) {
        can_vote = true;
        var username = Meteor.user().username;
        super.find().forEach(function(poll){
          if(self.votedToday(poll) && poll.username == username)
            can_vote = false;
        });
      }
      return can_vote;
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
      }).sort(function(x,y){
         return x.votes.length < y.votes.length ? 1 : -1;
      });
    }
    votesToday(restaurant){
      var self = this;
      var votes = [];
      super.find().forEach(function(poll) {
         if(poll.restaurant_id == restaurant._id && self.votedToday(poll))
            votes.push(poll.username);
      });
      return votes;
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
