const express = require('express');
const router = express.Router();
const Request = require("../../models/console/Request.model");
const Manufacture = require("../../models/console/Manufacture.model");
const line = require("../../models/line.handleEvent");

// query  request work ในหน้าอนุมัติ
router.get("/:id/:enterprise", function (req, res, next) {
    if (req.params.id && req.params.enterprise) {
        Request.GetAllRequestWorkByEnterpriseId(req.params, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(204).json(false);
    }
});

// การอนุมัติคนทำงาน
router.put("/:id/:entId", function (req, res, next) {
    if (!req.params.entId) {
        res.status(204)
    }

    if (req.body.approve < req.body.rwVolume && !req.body.cutloss) {
        Request.CreateRequestSomeApprove(req.body, function (err, rows) {
            if (err) {
                res.status(200).json(err);
            } else {
                if (req.body.newStatus === 2) {
                    Manufacture.CreateManufactureNewRequest(req.body, rows.insertId, function (err, Crerows) {
                        if (err) {
                            res.status(200).json(err);
                        }
                        let event = {
                            message: {
                                type: 'approve_your_work',
                                text: 'approve_your_work',
                                work: req.body,
                            }
                        }
                        line.handleEvent(event)
                    });
                }
                Request.UpdateRequestSomeApprove(req.body, function (err, last) {
                    if (err) {
                        res.status(200).json(err);
                    } else {
                        res.status(200).json(last);
                    }
                });

            }
        });
    } else {
        // Approve Request
        Request.UpdateRequestWorkStatus(req.body, req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                if (req.body.newStatus === 2) {
                    Manufacture.CreateManufacture(req.body, function (err, rows) {
                        if (err) {
                            res.status(200).json(err);
                        } else {
                            let event = {
                                message: {
                                    type: 'approve_your_work',
                                    text: 'approve_your_work',
                                    work: req.body,
                                }
                            }
                            line.handleEvent(event)
                            res.status(200).json(rows);
                        }
                    });
                } else {
                    if (req.body.cutloss) {
                        Manufacture.UpdateManufactureWhenRequestWorkCancel(req.body, function (err, rows) {
                            if (err) {
                                res.status(204).json(err);
                            } else {
                                if (req.body.mfProgress === 0) {
                                    Manufacture.DeleteManufactureWhenRequestWorkCancel(req.body, function (err, rows) {
                                        if (err) {
                                            res.status(204).json(err);
                                        } else {

                                            res.status(200).json(true)
                                        }
                                    });
                                } else {
                                    res.status(200).json(true);
                                }

                            }
                        });
                    } else {
                        res.status(200).json(rows);
                    }

                }
            }
        });


    }

});

module.exports = router;