// ////////////////////////
// MIDDLEWARE FUNCTIONS
// ////////////////////////

// Require users to log into the website.
const requiresLogin = (req, res, next) => {
  // If not on a secure protocol, redirect to it.
  if (!req.session.account) {
    // Redirect to the signup menu if it requires a login.
    return res.redirect('/signup');
  }
  // If already on secure profile, continue to next middleware.
  return next();
};

// Require users to logout in order to see a particular page.
const requiresLogout = (req, res, next) => {
  // If logged in, go to the dashboard.
  if (req.session.account) {
    return res.redirect('/dashboard');
  }
  return next();
};

// Requires CSRF Token.
const requiresCSRFToken = (err, req, res, next) => {
  // Check if CSRF token has been included.
  if(err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  // Missing the token.
  console.error('Missing CSRF token.');
  return false;
};

// ////////////////////////
// MODULE EXPORTS
// ////////////////////////

module.exports = {
  requiresLogin,
  requiresLogout,
  requiresCSRFToken,
};
