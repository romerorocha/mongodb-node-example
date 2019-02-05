const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    await joe.save();
  });

  it('model instance remove', async () => {
    await joe.remove();
    const user = await User.findOne({ name: joe.name });
    assert.equal(user, null);
  });

  it('class method deleteMany', async () => {
    const name = 'Joe';
    await User.deleteMany({ name });
    const user = await User.findOne({ name });
    assert.equal(user, null);
  });

  it('class method findOneAndDelete', async () => {
    const name = 'Joe';
    await User.findOneAndDelete({ name });
    const user = await User.findOne({ name });
    assert.equal(user, null);
  });

  it('class method findByIdAndDelete', async () => {
    await User.findByIdAndDelete(joe._id);
    const user = await User.findById(joe._id);
    assert.equal(user, null);
  });
});
