
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';

//api
class DevelopersCollection extends BaseCollection {
  insert(name) {
    return super.insert({
      name: name,
      createdAt: new Date(),
    });
  }
}
export const Developers = new DevelopersCollection('developers');

//schema
Developers.schema = new SimpleSchema({
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Developers.attachSchema(Developers.schema);
