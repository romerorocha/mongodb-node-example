const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', function() {
  it('can create a subdocument', async function() {
    const [title, author, body] = ['My Post', 'Me', 'Content'];

    const joe = new User({
      name: 'Joe',
      posts: [{ title, author, body }],
    });

    await joe.save();

    const user = await User.findOne({ name: 'Joe' });
    assert.equal(user.posts[0].title, title);
    assert.equal(user.posts[0].author, author);
    assert.equal(user.posts[0].body, body);
  });

  it('can add subdocuments to an existing record', async function() {
    // Create user
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    await joe.save();

    // Update user adding post
    const user = await User.findOne({ name: 'Joe' });
    user.posts.push({ title: 'New Post' });

    await user.save();

    // Validate operation
    const updatedUser = await User.findOne({ name: 'Joe' });
    assert.equal(updatedUser.posts[0].title, 'New Post');
  });
});
