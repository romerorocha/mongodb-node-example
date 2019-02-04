const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const clearDB = done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
};

suiteSetup(done => {
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

setup(clearDB);

// after(clearDB);
