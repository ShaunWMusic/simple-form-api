const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Stats extends JsonApiView {
  get attributes() {
    return ['name', 'address', 'phone', 'website', 'lat', 'lng'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'stat',
    });
  }

  categories() {
    return this.hasMany('App/Http/JsonApiViews/Category', {
      included: true,
      excludeRelation: 'stats',
    });
  }

}

module.exports = Stats;
