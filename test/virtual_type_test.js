const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', function() {
  it('postCount returns number of posts', async function() {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }],
    });

    await joe.save();

    const user = await User.findOne({ name: 'Joe' });
    assert.equal(joe.postCount, '1');
  });
});
