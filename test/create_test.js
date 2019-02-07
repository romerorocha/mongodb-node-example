const assert = require('assert');
const User = require('../src/user');

describe('Creating records', function() {
  it('saves a user', function(done) {
    const joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      assert.ok(!joe.isNew);
      done();
    });
  });
});
