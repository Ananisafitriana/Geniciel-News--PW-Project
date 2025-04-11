require('coffee-script');
load = require './services/load'
sample = require './services/sample'

SpexUtil =

  load: (namespace) -> load namespace
  sample: (model) -> sample model


module.exports = SpexUtil

