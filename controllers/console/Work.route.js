const express = require('express');
const router = express.Router();
const Work = require("../../models/console/Work.model");
const Employee = require("../../models/console/Employee.model");
const Customer = require("../../models/console/Customer.model");
const line = require("../../models/line.handleEvent");
const liff = require("../../models/console/Enterprise.setting.model");
const Firebase = require("../../config/firebase.admin.sdk");

// query work
router.get('/:entId', function (req, res, next) {
    if (req.params.entId) {
        Work.GetAllWorks(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});
router.get('/notification/:entId', function (req, res, next) {
    if (req.params.entId) {
        Work.GetAllWorksForNotification(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

router.get('/:entId/events', function (req, res, next) {
    if (req.params.entId) {
        Work.GetAllWorksForEvent(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json();
    }
});

router.get('/:entId/:start/:end', function (req, res, next) {
    if (req.params.entId && req.params.start && req.params.end) {
        Work.GetWorksRecentEnd(req.params, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json();
    }
});


// query work ที่เผยแพร่
router.get('/published/:entId', function (req, res, next) {
    if (req.params.entId) {
        Work.GetPublishedWorks(req.params.entId, function (err, rows) {
            if (err) res.json(err);

            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

// query work ที่เผยแพร่
router.get('/statistic/:entId', function (req, res, next) {
    if (req.params.entId) {
        Work.GetPublishedWorks(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

// เพิ่มงาน
router.post('/', function (req, res, next) {
    if (req.body) {
        Customer.GetExistsCustomer(req.body, function (err, rows) {
            if (err) res.json(err);
            else {
                if (rows[0].exists > 0) {
                    Work.AddWork(req.body, rows[0], function (err, add) {
                        if (err) res.json(err);
                        else {
                            Firebase.activity.collection(`${req.body.entId}`).doc(`${new Date().getTime()}`).set({
                                title: `งาน #${add.insertId} ถูกเพิ่มใหม่`,
                                color: '#56a7ff',
                                image: `${req.body.workImages}`,
                                time: new Date().getTime()
                            });
                            res.status(201).json(true);
                        }
                    });
                } else {
                    Customer.Add(req.body, function (err, add) {
                        if (err) res.json(err);
                        else {
                            Work.AddWorkIsNewCustomer(req.body, add.insertId, function (err, addW) {
                                if (err) res.json(err);
                                else {
                                    Firebase.activity.collection(`${req.body.entId}`).doc(`${new Date().getTime()}`).set({
                                        title: `งาน #${addW.insertId} ถูกเพิ่มใหม่`,
                                        color: '#56a7ff',
                                        image: `${req.body.workImages}`,
                                        time: new Date().getTime()
                                    });
                                    res.status(201).json(true);
                                }
                            });

                        }
                    });

                }
            }
        })

    } else {
        res.status(204).json(false)
    }
});


// ลบงาน
router.delete('/:id/:enterprise', function (req, res, next) {
    if (req.params.id && req.params.enterprise) {
        Work.RemoveWork(req.params, function (err, rows) {
            if (err) res.json(err);
            else {
                Firebase.activity.collection(`${req.params.enterprise}`).doc(`${new Date().getTime()}`).set({
                    title: `งาน #${req.params.id} ถูกลบออกจากระบบแล้ว`,
                    color: '#dc3545',
                    time: new Date().getTime()
                });
                res.status(200).json(true);
            }
        });

    } else {
        res.status(204).json(false)
    }
});

// update รูป
router.put('/image/:id', function (req, res, next) {
    if (req.params.id) {
        Work.UpdateImageForWork(req.params.id, req.body, function (err, rows) {
            if (err) res.json(err);
            else res.status(200).json(true);
        });
    } else {
        res.status(204).json(false);
    }
});

// update status
router.put('/status/:id/:entId', function (req, res, next) {
    if (req.params.id) {
        Work.UpdateStatusForWork(req.params.id, req.body, function (err, rows) {
            if (err) res.json(err);
            else {
                if (req.body.workStatus > 2 && req.body.workStatusOld < 3 && req.body.workStatus !== req.body.workStatusOld) {
                    Employee.GetAllEmployeesForNotification(req.params.entId, function (err, rows) {
                        if (err) res.json(err);
                        else {
                            liff.GetLiffHomeForNotification(req.params.entId, function (err, liffRows) {
                                let event = {
                                    message: {
                                        type: 'work_new',
                                        text: 'ดูงานของฉัน',
                                        ids: rows,
                                        work: req.body.work,
                                        liff: liffRows[0].liff_full_home
                                    }
                                }
                                line.handleEvent(event)

                            })
                            Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
                                title: `งาน #${req.params.id} ได้ถูกเปิดให้รับงานได้`,
                                color: '#007bff',
                                time: new Date().getTime()
                            });

                            res.status(200).json(true)

                        }

                    })
                } else res.status(200).json(true)
            };
        });
    } else {
        res.status(204).json(false);
    }
});

// update ข้อมูล
router.put('/info/:id', function (req, res, next) {
    if (req.params.id) {
        Work.UpdateInformationForWork(req.params.id, req.body, function (err, rows) {
            if (err) res.json(err);
            else res.status(200).json(true);
        });
    } else {
        res.status(204).json(false);
    }
});


module.exports = router;