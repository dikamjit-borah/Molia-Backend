const service = require("../services/service");

const save = async (req, res) => {
  const payload = req.body;
  //validate payload
  res.send(await service.saveTitle(payload));
};

module.exports = {
  save,
};
