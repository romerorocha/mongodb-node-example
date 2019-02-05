const assert = require('assert');
const User = require('../src/user');

describe('Validating records', function() {
  let user;

  function assertValidation(message) {
    const result = user.validateSync();
    assert.equal(result.errors.name.message, message);
  }

  it('requires a user name', async function() {
    user = new User({ name: undefined });
    assertValidation('Name is required.');
  });

  it("requires a user's name longer than 2 characters", function() {
    user = new User({ name: 'Al' });
    assertValidation('Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', async function() {
    try {
      const user = new User({ name: 'Al' });
      await user.save();
    } catch (validationResult) {
      const { message } = validationResult.errors.name;
      assert.equal(message, 'Name must be longer than 2 characters.');
    }
  });
});
