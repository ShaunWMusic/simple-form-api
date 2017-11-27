const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Uploads extends JsonApiView {
  get attributes() {
    return ['profile_pic_url'];
  }

  // pids() {
  //   return this.hasMany('App/Http/JsonApiViews/Pids', {
  //     included: true,
  //     excludeRelation: 'ae15m'
  //   });
  // }

}

module.exports = Uploads;
