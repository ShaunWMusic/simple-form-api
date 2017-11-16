const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Pids extends JsonApiView {
  get attributes() {
    return ['email', 'is_admin', 'is_approved'];
  }

  AE15m() {
    return this.belongsTo('App/Http/JsonApiViews/AE15m', {
      included: true,
      excludeRelation: 'pids',
    });
  }
  //
  // AE1m() {
  //   return this.belongsTo('App/Http/JsonApiViews/AE1m', {
  //     included: true,
  //     excludeRelation: 'pid',
  //   });
  // },
  //

}

module.exports = Pids;
