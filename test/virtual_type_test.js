const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', function() {
  it('postCount returns number of posts', function(done) {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert.equal(user.postCount, '1');
        done();
      });
  });
});
