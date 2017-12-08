const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Users extends JsonApiView {
  get attributes() {
    return ['email'];
  }


}

module.exports = Users;
