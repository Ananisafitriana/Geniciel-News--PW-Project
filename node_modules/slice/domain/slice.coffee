path = require 'path'
getModuleRoot  = require './services/getModuleRoot'
getEnvironment = require './services/getEnvironment'
getModules     = require './services/getModules'
mixinModules   = require './services/mixinModules'

Slice = (currentDir, domainDir) ->

  if !currentDir? then throw new Error 'slice: no dir specified'
  domainDir ?= 'domain'
  slice = {}
    
  getModuleRoot currentDir, domainDir, (moduleRoot) ->
    slice.moduleRoot = moduleRoot
    slice.domainRoot = path.join moduleRoot, domainDir
    getEnvironment moduleRoot, (env) ->
      slice.env = env 
      getModules slice, (modules) ->
        return mixinModules slice, modules


module.exports = Slice
