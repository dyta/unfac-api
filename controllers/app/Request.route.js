const express = require("express");
const router = express.Router();
const Request = require("../../models/app/Request.model");
const Work = require("../../models/app/Work.model");
const Firebase = require("../../config/firebase.admin.sdk");

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
                        Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
                            title: `${req.body.empFullname} ได้ส่งคำขอทำงาน #${req.body.rwWorkId}`,
                            image: req.body.empPictureUrl,
                            color: '#ffc107',
                            time: new Date().getTime()
                        });
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