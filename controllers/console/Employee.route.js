const express = require('express');
const router = express.Router();
const Employee = require("../../models/console/Employee.model");
const line = require("../../models/line.handleEvent");
const Firebase = require("../../config/firebase.admin.sdk");

// invite code exists
router.get('/:entId', function (req, res, next) {
    if (req.params.entId) {
        Employee.GetAllEmployees(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

router.get('/notification/:entId', function (req, res, next) {
    if (req.params.entId) {
        Employee.GetAllEmployeesForNotificationManual(req.params.entId, function (err, rows) {
            if (err) res.json(err);
            else res.json(rows);
        });
    } else {
        res.status(204).json([]);
    }
});

router.put('/:key', function (req, res, next) {
    if (req.body && req.params.key) {
        Employee.UpdateWhenConfirm(req.body, req.params.key, function (err, rows) {
            if (err) res.json(err);
            else {
                if (req.params.key * 1 === 1) {
                    Firebase.activity
                        .collection(`${req.body.entId}`)
                        .doc(`${new Date().getTime()}`)
                        .set({
                            title: `${req.body.empFullname} ได้รับการยืนยันการเป็นพนักงาน`,
                            image: `${req.body.empPictureUrl}`,
                            color: '#ddd',
                            time: new Date().getTime()
                        });
                    let event = {
                        message: {
                            type: 'approve_employee',
                            text: 'approve_employee',
                            employee: req.body,
                        }
                    }
                    line.handleEvent(event)
                } else {
                    Firebase.activity
                        .collection(`${req.body.entId}`)
                        .doc(`${new Date().getTime()}`)
                        .set({
                            title: `${req.body.empFullname} ถูกปลดจากการเป็นพนักงาน`,
                            image: `${req.body.empPictureUrl}`,
                            color: '#ddd',
                            time: new Date().getTime()
                        });
                }
                res.status(200).json(true);
            }
        });
    } else {
        res.status(204).json(false);
    }
});

router.put('/:key/capacity', function (req, res, next) {
    if (req.body && req.params.key) {
        Employee.UpdateCapacityById(req.body.empCapacity, req.params.key, function (err, rows) {
            if (err) res.json(err);
            else {
                res.status(200).json(true);
            }
        });
    } else {
        res.status(204).json(false);
    }
});


module.exports = router;