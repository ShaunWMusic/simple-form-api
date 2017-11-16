'use strict';

const AE15m = use('App/Model/AE15m');
const attributes = ['name'];

class AE15mController {

  * index(request, response) {
    const Pid = yield AE15m.with('organizations').fetch();

    response.jsonApi('AE15m', Pid);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const category = yield AE15m.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('AE15m', category);
  }

  * show(request, response) {
    const id = request.param('id');
    const category = yield AE15m.with('organizations').where({ id }).firstOrFail();

    response.jsonApi('AE15m', category);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const category = yield AE15m.with('organizations').where({ id }).firstOrFail();
    category.fill(Object.assign({}, input, foreignKeys));
    yield category.save();

    response.jsonApi('AE15m', category);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const category = yield AE15m.query().where({ id }).firstOrFail();
    yield category.delete();

    response.status(204).send();
  }

}

module.exports = AE15mController;
