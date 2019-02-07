const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', function() {
  let joe, maria, alex, zach;

  beforeEach(function(done) {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise.all([zach.save(), joe.save(), maria.save(), alex.save()]).then(() =>
      done(),
    );
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

  it('can skip and limit the result set', function(done) {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert.equal(users.length, 2);
        assert.equal(users[0].name, 'Joe');
        assert.equal(users[1].name, 'Maria');
        done();
      });
  });
});
