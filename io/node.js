var fs = require('fs')
var wstream = fs.createWriteStream('io/node')

for (var c = 0; c < 1000000; ++c) {
  wstream.write(c.toString())
}
wstream.end()
