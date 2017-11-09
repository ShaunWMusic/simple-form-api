'use strict';

const Pid = use('App/Model/Pid');

const Hash = use('Hash');
const storeAttributes = ['pid', 'firstname', 'lastname', 'email', 'password', 'jobtitle', 'managername', 'city', 'division', 'region'];
const updateAttributes = ['email', 'is-approved', 'is-admin'];

class PidController {

  get createRules() {
    return {
      email: 'required|email|unique:pid',
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
      return response.jsonApi('Pid', request.authUser);
    }
    const pid = yield Pid.fetch();

    response.jsonApi('Pid', pid);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(storeAttributes);

    yield request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = yield Hash.make(input.password);
    const foreignKeys = {
    };
    const pid = yield Pid.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Pid', pid);
  }

  * show(request, response) {
    const id = request.param('id');
    const pid = yield Pid.with('stats').where({ id }).firstOrFail();

    response.jsonApi('Pid', pid);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(updateAttributes);
    const foreignKeys = {
    };

    const pid = yield Pid.with('stats').where({ id }).firstOrFail();
    pid.fill(Object.assign({}, input, foreignKeys));
    yield pid.save();

    response.jsonApi('Pid', pid);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const pid = yield Pid.query().where({ id }).firstOrFail();
    yield pid.delete();

    response.status(204).send();
  }

}

module.exports = PidController;
