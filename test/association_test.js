const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', function() {
  let joe, blogPost, comment;

  beforeEach(async function() {
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

    await Promise.all([joe.save(), blogPost.save(), comment.save()]);
  });

  it('saves a relation between a user and a blogpost', async function() {
    const user = await User.findOne({ name: 'Joe' }).populate('blogPosts');

    assert.equal(user.name, 'Joe');
    assert.equal(user.blogPosts[0].title, 'My Post');
  });

  it('saves a full relation graph', async function() {
    const user = await User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user',
        },
      },
    });

    assert.equal(user.name, 'Joe');
    assert.equal(user.blogPosts[0].title, 'My Post');
    assert.equal(user.blogPosts[0].comments[0].content, 'My comment!');
    assert.equal(user.blogPosts[0].comments[0].user.name, 'Joe');
  });
});
