const express = require("express");
const router = express.Router();
const Manufacture = require("../../models/app/Manufacture.model");

router.get("/:entId/:key/:employee", function (req, res, next) {
    if (req.params.entId) {
        Manufacture.GetMaunufactureByEmployee(req.params, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(204);
    }
});

router.put("/:entId/progress", function (req, res, next) {
    if (req.params.entId) {
        Manufacture.UpdateProgress(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json(true);
            }
        });
    } else {
        res.status(204).json(false);
    }
});


module.exports = router;