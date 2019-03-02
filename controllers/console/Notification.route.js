const express = require('express');
const router = express.Router();
const line = require("../../models/line.handleEvent");
const Firebase = require("../../config/firebase.admin.sdk");
const liff = require("../../models/console/Enterprise.setting.model");

// query work
router.post('/:entId', function (req, res, next) {
    if (req.params.entId && req.body) {
        liff.GetLiffHomeForNotification(req.params.entId, function (err, liffRows) {
            let event = {
                message: {
                    type: 'send_notification_manual',
                    text: 'send_notification_manual',
                    ids: req.body.uid,
                    work: req.body.works,
                    liff: liffRows[0].liff_full_home
                }
            }
            line.handleEvent(event)

        })

        Firebase.activity.collection(`${req.params.entId}`).doc(`${new Date().getTime()}`).set({
            title: `คุณได้ทำการส่งข้อความไปยังพนักงาน`,
            color: '#20c997',
            time: new Date().getTime()
        });
        res.status(200).json(true);
    } else {
        res.status(204).json(false);
    }
});


module.exports = router;