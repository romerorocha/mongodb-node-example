const assert = require('assert');
const User = require('../src/user');

describe('Updating records', function() {
  let joe;

  beforeEach(async function() {
    joe = new User({ name: 'Joe', postCount: 1 });
    await joe.save();
  });

  const assertName = async function(name) {
    const users = await User.find({});
    assert.equal(users.length, 1);
    assert.equal(users[0].name, name);
  };

  it('instance type using set and save', async function() {
    joe.set('name', 'Alex');
    await joe.save();
    assertName('Alex');
  });

  it('model instance using update', async function() {
    await joe.updateOne({ name: 'Alex' });
    assertName('Alex');
  });

  it('model class can update', async function() {
    await User.updateMany({ name: 'Joe' }, { name: 'Alex' });
    assertName('Alex');
  });

  it('model class can update onde record', async function() {
    await User.updateOne({ name: 'Joe' }, { name: 'Alex' });
    assertName('Alex');
  });

  it('model class can find and Id and update', async function() {
    await User.findByIdAndUpdate(joe._id, { name: 'Alex' });
    assertName('Alex');
  });

  it('a user can have postCount incremented by 1', async function() {
    await User.updateMany({ name: 'Joe' }, { $inc: { postCount: 2 } });
    const user = await User.findOne({ name: 'Joe' });
    assert.equal(user.postCount, 3);
  });
});
