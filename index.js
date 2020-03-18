'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    diffCatch: require('./dist/my-Util'),
  }
} else {
  module.exports = {
    diffCatch: require('./src/index').diffCatch
  }
}
