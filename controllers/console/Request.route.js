const express = require('express');
const router = express.Router();
const Request = require("../../models/console/Request.model");
const Manufacture = require("../../models/console/Manufacture.model");
const line = require("../../models/line.handleEvent");
const Firebase = require("../../config/firebase.admin.sdk");

// query  request work ในหน้าอนุมัติ
router.get("/:id/:enterprise", function (req, res, next) {
    if (req.params.id && req.params.id !== 'recent' && req.params.enterprise) {

        Request.GetAllRequestWorkByEnterpriseId(req.params, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else if (req.params.id === 'recent' && req.params.enterprise) {
        Request.GetRecentRequest(req.params, function (err, rows) {
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
                        Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
                            title: `${req.body.empFullname} ได้รับการอนุมัติทำงาน #${req.body.rwWorkId}`,
                            image: req.body.workImages,
                            color: '#ddd',
                            time: new Date().getTime()
                        });
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
                                Request.UpdateRequestWorkStatus(req.body, req.params.id, function (err, rows) {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        res.status(200).json(true)
                                    }
                                })
                            }
                        });
                    } else {
                        Request.UpdateRequestSomeApproveCancel(req.body, function (err, rows) {
                            if (err) {
                                res.status(204).json(err);
                            } else {
                                res.status(200).json(true)
                            }
                        });
                    }

                }
            });
        } else {
            Request.UpdateRequestWorkStatus(req.body, req.params.id, function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    if (req.body.newStatus === 2) {
                        Manufacture.CreateManufacture(req.body, function (err, rows) {
                            if (err) {
                                res.status(200).json(err);
                            } else {
                                Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
                                    title: `${req.body.empFullname} ได้รับการอนุมัติทำงาน #${req.body.rwWorkId}`,
                                    image: req.body.workImages,
                                    color: '#ddd',
                                    time: new Date().getTime()
                                });
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
                    }
                }
            });
        }
    }

});

router.post("/:entId", function (req, res, next) {
    if (req.params.entId && req.body) {
        Request.CreateRequestWorkManual(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                Manufacture.CreateManufactureManual(req.body, rows.insertId, function (err, rows) {
                    if (err)
                        res.json(err);
                    else {
                        Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
                            title: `ขอรับงานให้ ${req.body.name} เป็นกรณีพิเศษ`,
                            image: req.body.workImages,
                            color: '#6f42c1',
                            time: new Date().getTime()
                        });
                    }
                    res.status(200).json(true);
                })

            }
        })
    } else {
        res.status(204);
    }
});

module.exports = router;