const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class AE15m extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  pid() {
    return this.hasMany('App/Http/JsonApiViews/Pid', {
      included: true,
      excludeRelation: 'ae15m'
    });
  }

}

module.exports = AE15m;
