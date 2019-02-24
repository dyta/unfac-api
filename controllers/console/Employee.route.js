const express = require('express');
const router = express.Router();
const Employee = require("../../models/console/Employee.model");

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


module.exports = router;