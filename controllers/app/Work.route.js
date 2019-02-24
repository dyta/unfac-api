const express = require("express");
const router = express.Router();
const Work = require("../../models/app/Work.model");

router.get("/:entId", function (req, res, next) {
    if (req.params.entId) {
        Work.GetPublishedWorks(req.params.entId, function (err, rows) {
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



module.exports = router;