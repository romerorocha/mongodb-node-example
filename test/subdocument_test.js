const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', function() {
  it('can create a subdocument', function(done) {
    const [title, body] = ['My Post', 'Content'];

    const joe = new User({
      name: 'Joe',
      posts: [{ title, body }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert.equal(user.posts[0].title, title);
        assert.equal(user.posts[0].body, body);
        done();
      });
  });

  it('can add subdocuments to an existing record', function(done) {
    // Create user
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(updatedUser => {
        assert.equal(updatedUser.posts[0].title, 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', function(done) {
    const joe = new User({ name: 'Joe', posts: [{ title: 'New Title' }] });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(updatedUser => {
        assert.equal(updatedUser.posts.length, 0);
        done();
      });
  });
});
