import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';
import { Restaurants } from '/api/restaurants/';
import { Scores } from '/api/scores/';

//api
class PollsCollection extends BaseCollection {
    vote(username, restaurant_id) {
      var can_vote = this.can_vote();
      if(can_vote){
        super.insert({
          username: username,
          restaurant_id: restaurant_id,
          createdAt: new Date(),
        });
        if(this.votes_left().length == 0) {
          this.finish();
        }
      }
    }
    today_winner(){
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        return Scores.findOne({ createdAt: { "$gte" : today } });
    }
    check_time(hour, min){
      if(!this.today_winner()){
        var time_now = new Date().toISOString().substr(11, 6);
        if(time_now >= hour + ":" + min) {
          this.finish();
        }
      }
    }
    finish(){
        var restaurant_id_winner = this.poll_today()[0].restaurant_id;
        Scores.win(restaurant_id_winner);
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
    poll_today(){
      var self = this;
      var poll = [];
      Restaurants.find().forEach(function(restaurant){
         if(Scores.won_on(7, restaurant._id))
            return;
         var votes = self.votes_today(restaurant);
         poll.push({
           restaurant_id: restaurant._id,
           restaurant_name: restaurant.name,
           votes: votes
         });
      })
      poll.sort(function(x,y){
         return x.votes.length < y.votes.length ? 1 : -1;
      });
      return poll;
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
