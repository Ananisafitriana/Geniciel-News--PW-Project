extend = require('extenze').extend

mixinModules = (slice, modules) ->

  load = (mod) ->
    mod = require mod
    if typeof mod is "function" then return mod slice
    else return mod
    
  return extend slice, load( mod ) for mod in modules
              

module.exports = mixinModules
