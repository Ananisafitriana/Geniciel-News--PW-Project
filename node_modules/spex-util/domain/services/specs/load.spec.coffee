#>> Setup

require 'should'
path = require 'path'
load = require '../load'

domainRoot = path.resolve '../../' # domain root

#>> When I try to load a system modulePath

path = load domainRoot, 'path'

#>> Then 

path.should.have.property "resolve"

#>> When I try to load a regular module

useless = load domainRoot, 'useless'

#>> Then

useless.should.have.property 'do'

#>> When I try to load a domain module

domainRoot = path.resolve '.' # current dir (services/specs/)

bar = load domainRoot, 'foo.bar'

#>> Then

bar.test().should.be.true
