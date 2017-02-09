import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';

//api
class PollsCollection extends BaseCollection {
  insert(userId, restaurantId) {
    return super.insert({
      userId: userId,
      restaurantId: restaurantId,
      createdAt: new Date(),
    });
  }
}
export const Polls = new PollsCollection('polls');

//schema
Polls.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  restaurantId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Polls.attachSchema(Polls.schema);
