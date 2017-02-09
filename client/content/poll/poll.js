import { Template } from 'meteor/templating';
import { Polls } from '/api/polls/';

Template.poll.events({
  'click .vote'() {
     Polls.vote(currentUser.userId());
  }
});

Template.poll.helpers({
  todayPoll: function(){
   return Polls.todayPoll();
  }
});
