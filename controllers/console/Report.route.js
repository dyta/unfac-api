const express = require('express');
const router = express.Router();
const Report = require("../../models/console/Report.model");

router.get('/:entId/:month', function (req, res, next) {
    if (req.params.entId && req.params.month) {
        Report.getReportByMouth(req.params.entId, req.params.month +
            '%',
            function (err, rows) {
                if (err) res.json(err);
                else res.json(rows);
            });
    } else {
        res.status(204).json([]);
    }
});

router.get('/total/:entId/:month', function (req, res, next) {
    if (req.params.entId && req.params.month) {
        Report.getAllTotalPrice(req.params.entId, req.params.month +
            '%',
            function (err, rows) {
                if (err) res.json(err);
                else res.json(rows);
            });
    } else {
        res.status(204).json([]);
    }
});




module.exports = router;