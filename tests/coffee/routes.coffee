{ expect } = require('chai')
routes     = require('../../routes')

describe 'Routes', ->
	describe 'index', ->
    it 'defines the index route', ->
      expect(routes.index).to.exist