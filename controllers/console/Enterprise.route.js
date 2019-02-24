const express = require("express");
const router = express.Router();
const Enterprise = require("../../models/console/Enterprise.model");

router.post("/", function (req, res, next) {
    if (req.body) {
        let key = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 14; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
        key += "FR"
        Enterprise.CreateNewEnterprise(key, req.body, function (err, rows) {
            if (err) {
                res.json(false);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.json(false);
    }
});

router.get('/isCode/:id', function (req, res, next) {
    if (req.params.id) {
        Enterprise.hasCode(req.params.id, function (err, rows) {
            if (err) {
                res.status(204).json(false);
            } else {
                if (rows.length === 1) {
                    res.status(200).json(rows);
                } else {
                    res.status(204).json(false);
                }
            }
        });
    } else {
        res.status(204).json(false)
    }
});

module.exports = router;