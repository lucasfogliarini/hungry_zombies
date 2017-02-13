import { Template } from 'meteor/templating';
import { Polls } from '/api/polls/';

Template.poll.onCreated(function () {
    check_time_over(this);
});

Template.poll.events({
  'click .vote'() {
     Polls.vote(Meteor.user().username, this.restaurant_id);
  },
  'click .reset'() {
     Polls.reset_poll_today();
  }
});

Template.poll.helpers({
  time(){
      return Template.instance().time.get();
  },
  poll_today(){
   return Polls.poll_today();
  },
  today(){
    var now = new Date();
    var mm = now.getMonth() + 1; // getMonth() is zero-based
    var dd = now.getDate();

    return [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            now.getFullYear()
           ].join('/');
  },
  voted_class(){
    return Polls.can_vote() && !Polls.today_winner() ? 'vote' : 'hide';
  },
  votes_left(){
    return Polls.votes_left();
  },
  is_winner(){
    return Polls.today_winner().restaurant_id == this.restaurant_id;
  },
  today_winner(){
    return Polls.today_winner();
  }
});

function check_time_over(template) {
    template.time = new ReactiveVar("00:00:00");

    Meteor.setInterval(()=>{
      var hour = template.$('#hour').val();
      var min = template.$('#min').val();
      Polls.check_time(hour, min);
    }, 5000);

    //view only
    Meteor.setInterval(()=>{
      var time_now = new Date().toISOString().substr(11, 8);
      template.time.set(time_now);
    }, 1000);
}
