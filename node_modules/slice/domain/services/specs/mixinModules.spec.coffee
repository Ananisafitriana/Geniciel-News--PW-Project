#>> Setup 

should = require 'should'
mixinModules = require '../mixinModules'

#>> Given an object module

modules = ['useless']

#>> And an empty slice

slice = {}

#>> When I pass in some modules

mixinModules slice, modules, (slice) ->

#>> Then 

  slice.should.have.property 'do' # from uselessJS


#>> Given an object module

modules = ['modulate']

#>> And an empty slice

slice = {}

#>> When I pass in some modules

mixinModules slice, modules, (slice) ->

#>> Then 

  slice.should.have.property 'load' # from modulate

