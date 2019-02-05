const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  const ALEX = 'Alex';
  const JOE = 'Joe';

  let joe;

  beforeEach(async () => {
    joe = new User({ name: JOE });
    await joe.save();
  });

  const assertName = async name => {
    const users = await User.find({});
    assert.equal(users.length, 1);
    assert.equal(users[0].name, name);
  };

  it('instance type using set and save', async () => {
    joe.set('name', ALEX);
    await joe.save();
    assertName(ALEX);
  });

  it('model instance using update', async () => {
    await joe.updateOne({ name: ALEX });
    assertName(ALEX);
  });

  it('model class can update', async () => {
    await User.updateMany({ name: JOE }, { name: ALEX });
    assertName(ALEX);
  });

  it('model class can update onde record', async () => {
    await User.updateOne({ name: JOE }, { name: ALEX });
    assertName(ALEX);
  });

  it('model class can find and Id and update', async () => {
    await User.findByIdAndUpdate(joe._id, { name: ALEX });
    assertName(ALEX);
  });
});
