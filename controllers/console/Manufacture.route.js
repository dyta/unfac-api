const express = require('express');
const router = express.Router();
const Manufacture = require("../../models/console/Manufacture.model");
const Request = require("../../models/console/Request.model");
const Work = require("../../models/console/Work.model");

router.get('/:entId', function (req, res, next) {
    if (req.params.entId) {
        Manufacture.GetManufactureProcessing(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});


router.get('/manage/:id/:enterprise', function (req, res, next) {
    if (req.params.id && req.params.enterprise) {
        Manufacture.GetAllManufactureByEnterpriseId(req.params, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

router.put("/:id/:entId", function (req, res, next) {
    if (!req.params.entId || !req.params.id) {
        res.status(204).json(false);
    }
    if (req.body.mfId && req.body.workId && req.body.toStatus) {
        Manufacture.UpdateManufactureProcessing(req.body, function (err, rows) {
            if (err) {
                res.status(204).json(false);
            } else {
                if (req.body.toStatus === 4) {
                    Request.UpdateRequestWorkStatus({
                            newStatus: req.body.toStatus
                        }, req.body.rwId,
                        function (err, rows) {
                            if (err) {
                                res.status(204).json(false);
                            } else {
                                res.status(200).json(true);
                            }
                        })
                    Work.UpdateStatusForWork(req.body.workId, {
                        workStatus: 0
                    })
                } else {
                    res.status(200).json(true);
                }
            }
        })
    } else {

        res.status(204).json(false);
    }

});


module.exports = router;