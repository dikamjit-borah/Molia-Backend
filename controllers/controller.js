const service = require("../services/service");

const save = (req, res) => {
  const payload = req.body;
  res.send(service.saveTitle(payload));
};

module.exports = {
  save,
};
