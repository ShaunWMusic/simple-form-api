'use strict';

const Lucid = use('Lucid');
const _ = require('underscore');

class Pid extends Lucid {

  apiTokens() {
    return this.hasMany('App/Model/Token');
  }
  ae15m() {
    return this.hasMany('App/Model/ae15m');
  }

  stats() {
    return this.hasOne('App/Model/Stats');
  }

  static get unguarded() {
    return false;
  }

  static get fillable() {
    return [
      'pid',
      'firstname',
      'lastname',
      'email',
      'password',
      'jobtitle',
      'managername',
      'city',
      'division',
      'region',
      'is_approved',
      'is_admin',
    ];
  }

  static get guarded() {
    return [];
  }

  isFillable(key) {
    return this.constructor.unguarded ||
      this.constructor.fillable.includes(key) ||
      (this.constructor.fillable.length === 0 && !this.constructor.guarded.includes(key));
  }

  setJSON(values) {
    _.each(values, (value, key) => {
      if (this.isFillable(key)) {
        this.attributes[key] = this.mutateProperty(key, value);
      }
    });
  }

}

module.exports = Pid;
