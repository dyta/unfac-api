const express = require('express');
const router = express.Router();
const line = require("../config/line.bot");
const e = require("../models/line.handleEvent");

router.post("/", line.middlewareLine, (req, res) => {
    res.status(200).json(`I'm listening.`)
    Promise.all(req.body.events.map(e.handleEvent))
        .then(() => res.status(200).end())
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


module.exports = router;