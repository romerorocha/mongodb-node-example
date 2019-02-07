const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', function() {
  let joe;

  beforeEach(function(done) {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', function(done) {
    joe
      .remove()
      .then(() => {
        return User.findOne({ name: joe.name });
      })
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });

  it('class method deleteMany', function(done) {
    const name = 'Joe';
    User.deleteMany({ name })
      .then(() => User.findOne({ name }))
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });

  it('class method findOneAndDelete', function(done) {
    const name = 'Joe';
    User.findOneAndDelete({ name }).then(() => {
      User.findOne({ name }).then(user => {
        assert.equal(user, null);
        done();
      });
    });
  });

  it('class method findByIdAndDelete', function(done) {
    User.findByIdAndDelete(joe._id).then(() => {
      User.findById(joe._id).then(user => {
        assert.equal(user, null);
        done();
      });
    });
  });
});
