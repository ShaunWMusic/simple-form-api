'use strict';

const Lucid = use('Lucid');

class Stats extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  categories() {
    return this.belongsToMany('App/Model/Stats');
  }
}

module.exports = Stats;
