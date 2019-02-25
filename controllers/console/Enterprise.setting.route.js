const express = require("express");
const router = express.Router();
const EnterpriseSetting = require("../../models/console/Enterprise.setting.model");
const liff = require('../../service/liff.service')
const firebase = require("../../config/firebase.admin.sdk");
router.get('/:id', function (req, res, next) {
    if (req.params.id) {
        EnterpriseSetting.GetEnterpriseSetting(req.params.id, function (err, rows) {
            if (err) {
                res.status(204).json(false);
            } else {
                res.status(200).json(rows);
            }
        });
    } else {
        res.status(204).json(false)
    }
});

router.post("/:id", async function (req, res, next) {
    if (req.params.id && req.body.open) {
        function generate(j) {
            let key = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 1; i <= j; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
            return key
        }

        let public_key = generate(32)
        const liff_full_home = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'full', '/')
        const liff_full_history = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'full', '/history')
        const liff_tall_account = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'tall', '/account')
        const liff_tall_wallet = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'tall', '/wallet')
        let data = {
            api: public_key,
            liff_full_home: `line://app/${liff_full_home.liffId}`,
            liff_full_history: `line://app/${liff_full_history.liffId}`,
            liff_tall_account: `line://app/${liff_tall_account.liffId}`,
            liff_tall_wallet: `line://app/${liff_tall_wallet.liffId}`,

            liff_tall_home: `Upgrade to Gold`,
            liff_compact_home: `Upgrade to Gold`,

            liff_tall_history: `Upgrade to Gold`,
            liff_compact_history: `Upgrade to Gold`,

            liff_full_account: `Upgrade to Gold`,
            liff_compact_account: `Upgrade to Gold`,

            liff_full_wallet: `Upgrade to Gold`,
            liff_compact_wallet: `Upgrade to Gold`
        }

        EnterpriseSetting.CreateEnterpriseSetting(req.params.id, data, function (err, rows) {
            if (err) {
                res.status(204).json(false);
            } else {
                firebase.activity.collection(`${req.params.id}`).doc(`${new Date().getTime()}`).set({
                    title: `เปิดใช้งาน API Service แล้ว`,
                    time: new Date().getTime()
                });
                res.status(200).json(true);
            }
        });

    } else {
        res.json(false);
    }
});

router.post("/:id/liff", async function (req, res, next) {
    if (req.params.id && req.body.open) {
        function generate(j) {
            let key = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 1; i <= j; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
            return key
        }

        let public_key = generate(32)
        // รายการงาน
        const liff_tall_home = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'tall', '/')
        const liff_compact_home = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'compact', '/')
        // ประวัติงาน
        const liff_tall_history = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'tall', '/history')
        const liff_compact_history = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'compact', '/history')
        // ข้อมูลส่วนตัว
        const liff_full_account = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'full', '/account')
        const liff_compact_account = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'compact', '/account')
        // แสดงรายได้
        const liff_full_wallet = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'full', '/wallet')
        const liff_compact_wallet = await liff.getLiff(req.params.id, public_key, process.env.LINE_LIFF_ACCESS_TOKEN, 'compact', '/wallet')

        let data = {
            api: public_key,
            liff_tall_home: `line://app/${liff_tall_home.liffId}`,
            liff_compact_home: `line://app/${liff_compact_home.liffId}`,

            liff_tall_history: `line://app/${liff_tall_history.liffId}`,
            liff_compact_history: `line://app/${liff_compact_history.liffId}`,

            liff_full_account: `line://app/${liff_full_account.liffId}`,
            liff_compact_account: `line://app/${liff_compact_account.liffId}`,

            liff_full_wallet: `line://app/${liff_full_wallet.liffId}`,
            liff_compact_wallet: `line://app/${liff_compact_wallet.liffId}`
        }

        EnterpriseSetting.CreateLiffEnterpriseSetting(req.params.id, data, function (err, rows) {
            if (err) {
                res.status(204).json(false);
            } else {
                firebase.activity.collection(`${req.params.id}`).doc(`${new Date().getTime()}`).set({
                    title: `สร้างการเชื่อมต่อเต็มรูปแบบ`,
                    time: new Date().getTime()
                });
                res.status(200).json(true);
            }
        });

    } else {
        res.json(false);
    }
});
module.exports = router;