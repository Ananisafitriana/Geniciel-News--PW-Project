path = require 'path'

getModules = (slice, next) ->

  env = require( path.join slice.moduleRoot, 'config/environments' )
  next env[slice.env].sliceModules


module.exports = getModules
