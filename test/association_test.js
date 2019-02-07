const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', function() {
  let joe, blogPost, comment;

  beforeEach(function(done) {
    joe = new User({
      name: 'Joe',
    });

    blogPost = new BlogPost({
      title: 'My Post',
      content: 'My text about something.',
    });

    comment = new Comment({
      content: 'My comment!',
    });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done(),
    );
  });

  it('saves a relation between a user and a blogpost', async function() {
    const user = await User.findOne({ name: 'Joe' }).populate('blogPosts');

    assert.equal(user.name, 'Joe');
    assert.equal(user.blogPosts[0].title, 'My Post');
  });

  it('saves a full relation graph', function(done) {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then(user => {
        const { title, comments } = user.blogPosts[0];

        assert.equal(user.name, 'Joe');
        assert.equal(title, 'My Post');
        assert.equal(comments[0].content, 'My comment!');
        assert.equal(comments[0].user.name, 'Joe');

        done();
      });
  });
});
