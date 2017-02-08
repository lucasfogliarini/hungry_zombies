import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


FlowRouter.route('/', {
  action() {
    BlazeLayout.render('main', { content: null });
  },
});

FlowRouter.route('/developers', {
  action() {
    BlazeLayout.render('main', { content: 'developers' });
  },
});

FlowRouter.notFound = {
  action() {
    console.log('not found');
  },
};
