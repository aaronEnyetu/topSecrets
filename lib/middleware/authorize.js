module.exports = async (req, res, next) => {
  try {
    //if the user does not exist, or the email does not match the expected email, user receives error

    if(!req.user || req.user.email !== 'admin') {
      throw new Error('Access Denied');
    }
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
