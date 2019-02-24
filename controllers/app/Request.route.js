const express = require("express");
const router = express.Router();
const Request = require("../../models/app/Request.model");
const Work = require("../../models/app/Work.model");

router.post("/:entId/:key", function (req, res, next) {
    if (req.params.entId && req.params.key && req.body) {
        Request.CreateRequestWork(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                Work.UpdateWorkWhenRequestWork(req.body, function (err, rows) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.status(201).json(true);
                    }
                });
            }
        })
    } else {
        res.status(204);
    }
});

module.exports = router;