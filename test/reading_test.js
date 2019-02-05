const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', function() {
  let joe;

  beforeEach(async function() {
    joe = new User({
      name: 'Joe',
    });

    await joe.save();
  });

  it('finds all users with a name of joe', async function() {
    const users = await User.find({ name: 'Joe' });
    assert.equal(users[0]._id.toString(), joe._id.toString());
  });

  it('find a user with a particular id', async function() {
    const user = await User.findOne({ _id: joe._id });
    assert.equal(user.name, 'Joe');
  });
});
