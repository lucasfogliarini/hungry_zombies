import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


FlowRouter.route('/', {
  action() {
    BlazeLayout.render('main', { content: 'poll' });
  },
});

FlowRouter.route('/developers', {
  action() {
    BlazeLayout.render('main', { content: 'developers' });
  },
});

FlowRouter.route('/restaurants', {
  action() {
    BlazeLayout.render('main', { content: 'restaurants' });
  },
});

FlowRouter.notFound = {
  action() {
    console.log('not found');
  },
};
