getEnvironment = (moduleRoot, next) ->

  next global.RZR?.ENV ? 'production'


module.exports = getEnvironment
