const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

before(done => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});

const clearDB = done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
};

beforeEach(clearDB);

// after(clearDB);
