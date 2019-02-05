const assert = require('assert');
const User = require('../src/user');

describe('Creating records', function() {
  it('saves a user', async function() {
    const joe = new User({ name: 'Joe' });
    await joe.save();

    assert.ok(!joe.isNew);
  });
});
