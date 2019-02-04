const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const clearDB = done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
};

before(done => {
  mongoose.connect(
    'mongodb://localhost/users_test',
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(clearDB);

// after(clearDB);
