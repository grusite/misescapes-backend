const mongoose = require('mongoose');
const { URL } = require('url');

// Disable deprecated options
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const uri = 'mongodb://127.0.0.1:27017/misescapes';

function connect() {
  console.log('connect ', new URL(uri).host);
  mongoose.connect(uri, { useNewUrlParser: true }, err => {
    if (err) {
      console.log(
        'error',
        'Failed to connect to mongo on startup - retrying in 5 sec',
        err.message,
      );
      setTimeout(connect, 5000);
    }
  });
}
function disconnect() {
  console.log('disconnecting');
  mongoose.connection.close();
}

mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('connecting', () => console.log('connecting'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));

module.exports = {
  connect,
  disconnect,
  connection: mongoose.connection,
};
