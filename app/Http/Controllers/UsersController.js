'use strict';
const Users = use('App/Model/Users');

const Hash = use('Hash');
const storeAttributes = ['email', 'password'];
const updateAttributes = ['email'];

class UsersController {

  get createRules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get createMessages() {
    return {
      'email.unique': 'That email has already been used by another account',
    };
  }



  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(storeAttributes);
    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = yield Hash.make(input.password);
    // const foreignKeys = {
    // };
    const user = yield Users.create(Object.assign({}, input));
    // console.log(pid);
    response.jsonApi('Users', user);
  }



}

module.exports = UsersController;
