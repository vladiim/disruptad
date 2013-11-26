expect = require('chai').expect
routes = require('../routes')

describe 'Routes', ->
  it 'defines the index route', ->
    expect(routes.index).to.exist