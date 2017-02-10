import { Template } from 'meteor/templating';
import { Polls } from '/api/polls/';

Template.poll.events({
  'click .vote'() {
     Polls.vote(Meteor.user().username, this.restaurant_id);
  }
});

Template.poll.helpers({
  poll_today: function(){
   return Polls.poll_today();
  },
  today: function(){
    return new Date().toDateString();
  },
  voted_title: function(){
   return Polls.can_vote() ? 'already voted' : '';
  },
  voted_class: function(){
    return Polls.can_vote() ? 'vote' : 'hide';
  },
  votes_left: function(){
    return Polls.votes_left();
  },
  winner: function(index) {
    return index == 0 && Polls.votes_left().length == 0;
  }
});
