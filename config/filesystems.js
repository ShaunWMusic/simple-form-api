'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

  default: 's3',

  public: {
    driver: 'local',
    root: Helpers.publicPath('uploads'),
    options: {
      encoding: 'utf8'
    }
  },

  s3: {
    driver: 's3',
    key: Env.get('AWS_KEY'),
    secret: Env.get('AWS_SECRET'),
    region: Env.get('AWS_REGION', 'us-east-1'),
    bucket: Env.get('AWS_BUCKET'),
  },

  protected: {
    driver: 'local',
    root: Helpers.storagePath('app'),
    options: {
      encoding: 'utf8'
    }
  }

}
