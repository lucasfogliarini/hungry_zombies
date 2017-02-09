import { Template } from 'meteor/templating';
import { Polls } from '/api/polls/';

Template.poll.events({
  'click .vote'() {
     Polls.vote(Meteor.user().username, this.restaurant_id);
  }
});

Template.poll.helpers({
  todayPoll: function(){
   return Polls.todayPoll();
  },
  today: function(){
    return new Date().toDateString();
  },
  voted_title: function(){
   return Polls.user_voted() ? 'already voted' : 'vote!';
  },
  voted_class: function(){
   return Polls.user_voted() ? 'voted' : 'vote';
  }
});
