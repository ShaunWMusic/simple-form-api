const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class AE15m extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  organizations() {
    return this.hasMany('App/Http/JsonApiViews/Organization', {
      included: true,
      excludeRelation: 'ae15m'
    });
  }

}

module.exports = AE15m;
