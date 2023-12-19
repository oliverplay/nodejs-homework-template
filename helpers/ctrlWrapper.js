const ctrlWrapper = (ctrl) => {
  async function fu(req, res, next) {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  return fu;
};
module.exports = ctrlWrapper;
