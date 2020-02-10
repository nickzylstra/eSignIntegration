const fancy = require('fancy-log');
const { getSession } = require('../controllers/auth');

async function requireAuth(req, res, next) {
  const tokenId = req.cookies.clientAuth;

  const session = await getSession(tokenId);
  fancy(session);
  if (!session) {
    fancy('invalid session');
    res.status(403).end('Invalid session, please reopen esign app through Welkin to reauthenticate.');
  } else {
    req.session = session;
    next();
  }
}

module.exports = {
  requireAuth,
};
