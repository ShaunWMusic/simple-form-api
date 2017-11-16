//This is fun

'use strict';

const Lucid = use('Lucid');

class AE15m extends Lucid {


  pids() {
    return this.belongsToMany('App/Model/Pids');
  }
}

module.exports = AE15m;
