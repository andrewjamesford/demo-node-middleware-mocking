const checkJwt = () => {
  return false;
};

const checkScopes = (requiredScopes) => {
  return true;
};

module.exports = {
  checkJwt,
  checkScopes
};


