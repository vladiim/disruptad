# { expect } = require('chai')
# chai       = require('chai')
# sinon      = require('sinon')
# sinonChai  = require("sinon-chai")
# { index }  = require('../../routes/index')

# chai.use(sinonChai)

# describe 'routes/index', ->
#   it 'calls res.render', ->
#     res = { render: -> }
#     sinon.stub(res, "render")
#     req = {}
#     index(req, res)
#     expect(res).to.be.calledWith("render")