'use strict';

const Lucid = use('Lucid');

class AE15m extends Lucid {


  pids() {
    return this.belongsToMany('App/Model/Pid');
  }
}

module.exports = AE15m;
