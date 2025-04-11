getModuleRoot = (currentDir, domainDir, next) ->

  next currentDir.split(domainDir)[0]


module.exports = getModuleRoot
