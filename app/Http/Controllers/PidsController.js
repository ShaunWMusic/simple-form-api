'use strict';

const Pids = use('App/Model/Pids');

const Hash = use('Hash');
// const storeAttributes = ['pid', 'firstname', 'lastname', 'email', 'password', 'managername', 'division', 'region'];
const storeAttributes = ['pid', 'firstname', 'lastname', 'email', 'password', 'managername'];
const updateAttributes = ['email', 'is-approved', 'is-admin'];

class PidsController {

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

  * index(request, response) {
    if (request.input('current')) {
      return response.jsonApi('Pids', request.authUser);
    }
    const pid = yield Pids.fetch();

    response.jsonApi('Pids', pid);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(storeAttributes);
    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = yield Hash.make(input.password);
    // const foreignKeys = {
    // };
    const pid = yield Pids.create(Object.assign({}, input));
    console.log(pid);
    response.jsonApi('Pids', pid);
  }

  * show(request, response) {
    const id = request.param('id');
    const pid = yield Pids.with('ae15m').where({ id }).firstOrFail();

    response.jsonApi('Pids', pid);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(updateAttributes);
    const foreignKeys = {
    };

    const pid = yield Pids.with('stats').where({ id }).firstOrFail();
    pid.fill(Object.assign({}, input, foreignKeys));
    yield pid.save();

    response.jsonApi('Pids', pid);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const pid = yield Pids.query().where({ id }).firstOrFail();
    yield pid.delete();

    response.status(204).send();
  }

}

module.exports = PidsController;
