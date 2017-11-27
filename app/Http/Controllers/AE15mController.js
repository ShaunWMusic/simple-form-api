'use strict';

const AE15m = use('App/Model/AE15m');
const attributes = ['name', 'fullyear', 'division'];

class AE15mController {

  * index(request, response) {
    const Pid = yield AE15m.with('pids').fetch();

    response.jsonApi('AE15m', Pid);
  }


  * show(request, response) {
    const id = request.param('id');
    const pid = yield AE15m.with('pids').where({ id }).firstOrFail();

    response.jsonApi('AE15m', pid);
  }


}

module.exports = AE15mController;
