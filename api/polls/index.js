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
    can_vote(username) {
      var self = this;
      var can_vote = false;
      if(!username)
         username = Meteor.userId() ? Meteor.user().username : undefined;
      if (username) {
        can_vote = true;
        super.find().forEach(function(poll){
          if(self.voted_today(poll) && poll.username == username)
            can_vote = false;
        });
      }
      return can_vote;
    }
    voted_today(poll){
      return poll.createdAt.toDateString() == new Date().toDateString();
    }
    votes_left(){
      var self = this;
      var users = Meteor.users.find().fetch();
      return users.filter(function(user){
         if(self.can_vote(user.username))
            return user;
      });
    }
    today_poll(){
      var self = this;
      return Restaurants.find().map(function(restaurant){
         var votes = self.votes_today(restaurant);
         return {
           restaurant_id: restaurant._id,
           restaurant_name: restaurant.name,
           votes: votes
         };
      }).sort(function(x,y){
         return x.votes.length < y.votes.length ? 1 : -1;
      });
    }
    votes_today(restaurant){
      var self = this;
      var votes = [];
      super.find().forEach(function(poll) {
         if(poll.restaurant_id == restaurant._id && self.voted_today(poll))
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
