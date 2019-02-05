const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

before(function(done) {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    .once('open', function() {
      done();
    })
    .on('error', function(error) {
      console.warn('Warning', error);
    });
});

beforeEach(function(done) {
  mongoose.connection.collections.users.drop(function() {
    done();
  });
});
