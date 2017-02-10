import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BaseCollection } from '../base.js';

//api
class ScoresCollection extends BaseCollection {
    win(restaurant_id) {
       super.insert({
         restaurant_id: restaurant_id,
         createdAt: new Date()
       });
    }
    wins(restaurant_id){
      var wins = [];
      super.find().forEach(function(score){
         if(score.restaurant_id == restaurant_id)
            wins.push(score);
      });
      return wins;
    }
    won_on(days_ago, restaurant_id) {
      var n_days_ago = new Date(new Date().setDate(new Date().getDate()-days_ago));
      var won = false;
      super.find().forEach(function(score){
        var w = score.restaurant_id == restaurant_id
                && score.createdAt > n_days_ago
                && score.createdAt.toDateString() != new Date().toDateString();
        if(w)
          won = true;
      });
      return won;
    }
}
export const Scores = new ScoresCollection('scores');

//schema
Scores.schema = new SimpleSchema({
  restaurant_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  }
});

Scores.attachSchema(Scores.schema);
