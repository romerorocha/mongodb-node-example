const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', function() {
  let joe;

  beforeEach(function(done) {
    joe = new User({
      name: 'Joe',
    });

    joe.save().then(() => {
      done();
    });
  });

  it('finds all users with a name of joe', function(done) {
    User.find({ name: 'Joe' }).then(users => {
      assert.equal(users[0]._id.toString(), joe._id.toString());
      done();
    });
  });

  it('find a user with a particular id', function(done) {
    User.findOne({ _id: joe._id }).then(user => {
      assert.equal(user.name, 'Joe');
      done();
    });
  });
});
