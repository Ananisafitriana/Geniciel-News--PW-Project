#>> Setup

should = require 'should'
getEnvironment = require '../getEnvironment'

#>> Given a module root

moduleRoot = __dirname

#>> When I call getEnvironment

getEnvironment moduleRoot, (env) ->

#>> Then

  env.should.equal 'production'


#>> Given a module root

moduleRoot = __dirname

#>> And a global RZR.ENV of 'foo'

global.RZR = {}
global.RZR.ENV = 'foo'


#>> When I call getEnvironment

getEnvironment moduleRoot, (env) ->

#>> Then

  env.should.equal 'foo'
