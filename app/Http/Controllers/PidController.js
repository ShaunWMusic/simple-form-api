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

  async index(request, response) {
    if (request.input('current')) {
      return response.jsonApi('Pid', request.authUser);
    }
    const pid = await Pid.fetch();

    response.jsonApi('Pid', pid);
  }

  async store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(storeAttributes);

    await request.jsonApi.assertValid(input, this.createRules, this.createMessages);

    input.password = await Hash.make(input.password);
    const foreignKeys = {
    };
    const pid = await Pid.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Pid', pid);
  }

  async show(request, response) {
    const id = request.param('id');
    const pid = await Pid.with('stats').where({ id }).firstOrFail();

    response.jsonApi('Pid', pid);
  }

  async update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(updateAttributes);
    const foreignKeys = {
    };

    const pid = await Pid.with('stats').where({ id }).firstOrFail();
    pid.fill(Object.assign({}, input, foreignKeys));
    await pid.save();

    response.jsonApi('Pid', pid);
  }

  async destroy(request, response) {
    const id = request.param('id');

    const pid = await Pid.query().where({ id }).firstOrFail();
    await pid.delete();

    response.status(204).send();
  }

}

module.exports = PidController;
