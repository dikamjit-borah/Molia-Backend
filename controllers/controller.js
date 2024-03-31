const service = require("../services/service");

const save = async (req, res) => {
  res.send(await service.saveTitle(req.body));
};

module.exports = {
  save,
};
