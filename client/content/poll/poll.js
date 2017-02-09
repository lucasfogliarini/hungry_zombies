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
   return Polls.can_vote() ? 'already voted' : '';
  },
  voted_class: function(){
    return Polls.can_vote() ? 'vote' : 'hide';
  }
});
