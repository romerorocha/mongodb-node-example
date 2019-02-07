const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', function() {
  let joe, blogPost;

  beforeEach(function(done) {
    joe = new User({
      name: 'Joe',
    });

    blogPost = new BlogPost({
      title: 'My Post',
      content: 'My text about something.',
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on delete', function(done) {
    joe
      .remove()
      .then(() => BlogPost.countDocuments())
      .then(count => {
        assert.equal(count, 0);
        done();
      });
  });
});
