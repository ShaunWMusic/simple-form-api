'use strict';

const AE15m = use('App/Model/AE15m');
const attributes = ['name'];

class AE15mController {

  async index(request, response) {
    const categories = await AE15m.with('organizations').fetch();

    response.jsonApi('AE15m', categories);
  }

  async store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const category = await AE15m.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('AE15m', category);
  }

  async show(request, response) {
    const id = request.param('id');
    const category = await AE15m.with('organizations').where({ id }).firstOrFail();

    response.jsonApi('AE15m', category);
  }

  async update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const category = await AE15m.with('organizations').where({ id }).firstOrFail();
    category.fill(Object.assign({}, input, foreignKeys));
    await category.save();

    response.jsonApi('AE15m', category);
  }

  async destroy(request, response) {
    const id = request.param('id');

    const category = await AE15m.query().where({ id }).firstOrFail();
    await category.delete();

    response.status(204).send();
  }

}

module.exports = AE15mController;
