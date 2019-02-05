const assert = require('assert');
const User = require('../src/user');

suite('Deleting a user', () => {
  let joe;

  setup(async () => {
    joe = new User({ name: 'Joe' });
    await joe.save();
  });

  test('model instance remove', async () => {
    await joe.remove();
    const user = await User.findOne({ name: joe.name });
    assert.equal(user, null);
  });

  test('class method deleteMany', async () => {
    const name = 'Joe';
    await User.deleteMany({ name });
    const user = await User.findOne({ name });
    assert.equal(user, null);
  });

  test('class method findOneAndDelete', async () => {
    const name = 'Joe';
    await User.findOneAndDelete({ name });
    const user = await User.findOne({ name });
    assert.equal(user, null);
  });

  test('class method findByIdAndDelete', async () => {
    await User.findByIdAndDelete(joe._id);
    const user = await User.findById(joe._id);
    assert.equal(user, null);
  });
});
