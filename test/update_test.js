const assert = require('assert');
const User = require('../src/user');

describe('Updating records', function() {
  let joe;

  beforeEach(function(done) {
    joe = new User({ name: 'Joe', likes: 1 });
    joe.save().then(() => done());
  });

  const assertName = function(name, done) {
    User.find({}).then(users => {
      assert.equal(users.length, 1);
      assert.equal(users[0].name, name);
      done();
    });
  };

  it('instance type using set and save', function(done) {
    joe.set('name', 'Alex');
    joe.save().then(() => {
      assertName('Alex', done);
    });
  });

  it('model instance using update', function(done) {
    joe.updateOne({ name: 'Alex' }).then(() => {
      assertName('Alex', done);
    });
  });

  it('model class can update', function(done) {
    User.updateMany({ name: 'Joe' }, { name: 'Alex' }).then(() => {
      assertName('Alex', done);
    });
  });

  it('model class can update onde record', function(done) {
    User.updateOne({ name: 'Joe' }, { name: 'Alex' }).then(() => {
      assertName('Alex', done);
    });
  });

  it('model class can find and Id and update', function(done) {
    User.findByIdAndUpdate(joe._id, { name: 'Alex' }).then(() => {
      assertName('Alex', done);
    });
  });

  it('a user can have postCount incremented by 1', function(done) {
    User.updateMany({ name: 'Joe' }, { $inc: { likes: 2 } })
      .then(() => {
        return User.findOne({ name: 'Joe' });
      })
      .then(user => {
        assert.equal(user.likes, 3);
        done();
      });
  });
});
