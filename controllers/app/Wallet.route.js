const express = require("express");
const router = express.Router();
const Manufacture = require("../../models/app/Manufacture.model");

router.get("/:entId/:empId", function (req, res, next) {
    if (req.params.entId && req.params.empId) {
        Manufacture.getSumaryFinished(req.params, function (err, rows) {
            res.status(200).json(rows);
        })


    } else {
        res.status(204);
    }
});

module.exports = router;