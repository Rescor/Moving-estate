const node_config = require("config");

module.exports = async function config(req, res) {
    res.json({ status: "ok", google_client_id: node_config.get("auth.GOOGLE_CLIENT_ID") });
};
