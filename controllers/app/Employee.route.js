const express = require("express");
const router = express.Router();
const Employee = require("../../models/app/Employee.model");
const Firebase = require("../../config/firebase.admin.sdk");

router.get("/:empLineId/:entId", function(req, res, next) {
  if (req.params.empLineId && req.params.entId) {
    Employee.GetEmployeeByLineID(req.params, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(rows[0]);
      }
    });
  } else {
    res.status(204);
  }
});

router.post("/:empLineId/:entId", async function(req, res, next) {
  if (req.params.empLineId && req.params.entId && req.body) {
    Employee.CreateEmployee(req.params, req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.status(201).json(true);
      }
    });
  } else {
    res.status(204);
  }
});

router.put("/:empLineId/:entId", async function(req, res, next) {
  if (req.params.empLineId && req.body) {
    Employee.UpdateEmployee(req.params.empLineId, req.body, function(
      err,
      rows
    ) {
      if (err) {
        res.status(204).json(err);
      } else {
        Firebase.activity
          .collection(`${req.params.entId}`)
          .doc(`${new Date().getTime()}`)
          .set({
            title: `${req.body.empFullname} ได้เข้ามาเป็นพนักงานใหม่`,
            image: `${req.body.empImage}`,
            time: new Date().getTime()
          });
        Employee.GetEmployeeByLineID(req.params, function(err, rows) {
          if (err) {
            res.json(err);
          } else {
            res.status(200).json(rows[0]);
          }
        });
      }
    });
  } else {
    res.status(204);
  }
});

module.exports = router;
