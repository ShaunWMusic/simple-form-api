const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Pid extends JsonApiView {
  get attributes() {
    return ['email', 'is_admin', 'is_approved'];
  }

  stats() {
    return this.belongsTo('App/Http/JsonApiViews/Stats', {
      included: true,
      excludeRelation: 'pid',
    });
  }
}

module.exports = Pid;
