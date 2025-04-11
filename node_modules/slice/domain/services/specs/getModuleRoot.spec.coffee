#>> Setup

should = require 'should'
getModuleRoot = require '../getModuleRoot'

#>> Given a dirname

dirname = "/path/to/your/app/domain/module/foo/bar"

#>> When I call getModuleRoot 

getModuleRoot dirname, 'domain', (moduleRoot) ->

#>> Then

  moduleRoot.should.equal "/path/to/your/app/"


#>> Given a nested dirname

dirname = "/path/to/app/node_modules/module/domain/module/foo/bar"

#>> When I call getModuleRoot 

getModuleRoot dirname, 'domain', (moduleRoot) ->

#>> Then

  console.log moduleRoot
#  moduleRoot.should.equal "/path/to/your/app/"

