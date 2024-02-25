const { tmpdir } = require('os');
const { uuidV5 } = require('uuid');

module.exports = {
  files: {
    base: process.env.FILES_DIR ?? tmpdir()
  },
  uuid_name_space: process.env.UUID_NAMESPACE ?? uuidV5.URL,
  auth: {
    secret: process.env.AUTH_TOKEN_SECRET,
    session_secret: process.env.AUTH_SESSION_SECRET
  }
}