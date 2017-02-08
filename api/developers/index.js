
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

//api
class BaseCollection extends Mongo.Collection {
  find(id) {
    return super.find({id: id});
  }
  remove(id) {
    return super.remove({id: id});
  }
  update(id, collection, callback) {
    return super.update({id: id}, collection, callback);
  }
}

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
