module.exports = async (err, req, res, _next) => {
  if (err) {
    // console.log(err);
    res.status(err.status).json({ error: err.message });
  }
};
