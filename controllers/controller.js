const service = require('../services/service');

const search = (req, res) => {
    const payload = req.body
    res.send(service.searchForTitle(payload));
};

module.exports = {
    search,
};
