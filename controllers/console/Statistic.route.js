const express = require('express');
const router = express.Router();
const Statistic = require("../../models/console/Statistic.model");

router.get('/:entId', function (req, res, next) {
    if (req.params.entId) {
        Statistic.GetCountStatistics(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});


module.exports = router;