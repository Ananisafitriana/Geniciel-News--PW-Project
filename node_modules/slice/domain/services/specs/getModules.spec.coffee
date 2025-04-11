#>> Setup

should = require 'should'
path = require 'path'
getModules = require '../getModules'

#>> Given a mock slice 

slice =
  moduleRoot: __dirname
  domainRoot: path.join __dirname, "domain"
  env: 'slice-test'

#>> When I call getModules

getModules slice, (modules) ->

#>> Then

  modules.length.should.equal 1
  modules[0].should.equal 'useless'


