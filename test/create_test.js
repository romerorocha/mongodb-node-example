const assert = require('assert');
const User = require('../src/user');

suite('Creating records', () => {
  test('saves a user', async () => {
    const joe = new User({ name: 'Joe' });

    await joe.save();

    assert.ok(!joe.isNew);
  });
});
