import { Mongo } from 'meteor/mongo';

export class BaseCollection extends Mongo.Collection {
  find(_id) {
    return _id == undefined ? super.find() : super.find({_id: _id});
  }
  remove(_id) {
    return super.remove({_id: _id});
  }
  update(_id, collection, callback) {
    return super.update({_id: _id}, collection, callback);
  }
}
