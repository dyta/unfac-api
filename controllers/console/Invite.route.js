const express = require("express");
const router = express.Router();
const Invite = require("../../models/console/Invite.model");
const Account = require("../../models/console/Account.model");

const Firebase = require("../../config/firebase.admin.sdk");

// invite code exists
router.get("/:id/:code", function (req, res, next) {
  if (req.params.id && req.params.code.length === 16) {
    // ตรวจสอบว่ามีการขอเข้าร่วมหรือยัง
    Invite.GetExistsAccountInInvite(req.params, function (err, rows) {
      if (err) res.json(err);
      else res.json(rows[0]);
    });
  } else if (req.params.id && req.params.code === "request") {
    // get invite by enterprise id
    Invite.GetAllInviteByEnterpriseId(req.params.id, function (err, rows) {
      if (err) res.json(err);
      else res.json(rows);
    });
  } else {
    res.status(204).json(false);
  }
});

// Request invite
router.post("/", function (req, res, next) {
  if (req.body) {
    Invite.CreateRequestInInvite(req.body, function (err, rows) {
      if (err) res.json(err);
      else {
        Account.UpdateRoleWhenRequestCollaborator(req.body, function (err, rows) {
          if (err) res.json(err);
          else res.status(200).json(true);
        })
      }
    });
  } else {
    res.status(204).json(false);
  }
});

module.exports = router;