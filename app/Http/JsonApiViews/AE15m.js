const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class AE15m extends JsonApiView {
  get attributes() {
    return ['name', 'fullyear', 'division'];
  }

  pids() {
    return this.hasMany('App/Http/JsonApiViews/Pids', {
      included: true,
      excludeRelation: 'ae15m'
    });
  }

}

module.exports = AE15m;
