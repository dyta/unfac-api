const express = require("express");
const router = express.Router();
const Enterprise = require("../../models/app/Enterprise.model");

router.get("/:entId/:key", function (req, res, next) {
    if (req.params.entId && req.params.key) {
        Enterprise.GetEnterprise(req.params, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json(rows[0]);
            }
        });
    } else {
        res.status(204);
    }
});

module.exports = router;