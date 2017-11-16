'use strict';

const Stats = use('App/Model/Stats');
const attributes = ['name', 'address', 'phone', 'website', 'lat', 'lng'];

const NodeGeocoder = require('node-geocoder');
const Env = use('Env');

// const options = {
//   provider: 'google',

//   // Optional depending on the providers
//   httpAdapter: 'https', // Default
//   apiKey: Env.get('GOOGLE_API_KEY'), // for Mapquest, OpenCage, Google Premier
//   formatter: null,         // 'gpx', 'string', ...
// };

const geocoder = NodeGeocoder(options);

class StatsController {

  * index(request, response) {
    const query = Stats.with('user', 'categories');

    if (request.input('category')) {
      const ids = yield Stats.query()
        .select('stats.id as id')
        .join('category_stat', 'category_stat.stat_id', 'stats.id')
        .join('categories', 'category_stat.category_id', 'categories.id')
        .whereIn('categories.name', request.input('category'));

      query.whereIn('id', ids.map(i => i.id));
    }

    const stats = yield query.fetch();

    response.jsonApi('Stats', stats);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };
    const [result] = yield geocoder.geocode(`${input.address} Nashville`);

    input.lat = result.latitude;
    input.lng = result.longitude;

    const stat = yield Stats.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Stats', stat);
  }

  * show(request, response) {
    const id = request.param('id');
    const stat = yield Stats.with('user').where({ id }).firstOrFail();

    response.jsonApi('Stats', stat);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };

    const categoryIds = request.jsonApi.getRelationId('categories');

    const stat = yield Stats.with('user', 'categories').where({ id }).firstOrFail();
    stat.fill(Object.assign({}, input, foreignKeys));
    yield stat.save();
    yield stat.categories().sync(categoryIds);

    yield stat.related('categories').load();

    response.jsonApi('Stats', stat);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const stat = yield Stats.query().where({ id }).firstOrFail();
    yield stat.delete();

    response.status(204).send();
  }

}

module.exports = StatsController;
