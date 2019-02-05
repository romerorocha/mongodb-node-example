const assert = require('assert');
const User = require('../src/user');

suite('Reading users out of the database', () => {
  let joe;

  setup(async () => {
    joe = new User({
      name: 'Joe',
    });

    await joe.save();
  });

  test('finds all users with a name of joe', async () => {
    const users = await User.find({ name: 'Joe' });
    assert.equal(users[0]._id.toString(), joe._id.toString());
  });

  test('find a user with a particular id', async () => {
    const user = await User.findOne({ _id: joe._id });
    assert.equal(user.name, 'Joe');
  });
});
