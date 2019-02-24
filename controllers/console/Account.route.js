const express = require("express");
const router = express.Router();
const Account = require("../../models/console/Account.model");
const Firebase = require("../../config/firebase.admin.sdk");

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

// account exists
router.get("/v2/account/_/:id", function (req, res, next) {
  if (req.params.id) {
    Account.GetExistsAccount(req.params.id, function (err, rows) {
      rows[0].exists = Boolean(Number(rows[0].exists));
      if (err) res.json(err);
      else res.json(rows[0]);
    });
  } else {
    res.status(204).json(false);
  }
});
// Query ข้อมูล Account
router.get("/v2/account/:id", function (req, res, next) {
  if (req.params.id) {
    Account.GetCurrentAccount(req.params.id, function (err, rows) {
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

// ข้อมูล package
router.get("/v2/account/package/:id", function (req, res, next) {
  if (req.params.id) {
    Account.GetPackage(req.params.id, function (err, rows) {
      if (err) res.json(err);
      else {
        if (rows[0]) {
          res.json(rows[0].entPackage);
        } else {
          res.json(0);
        }
      }
    });
  } else {
    res.status(204).json(false);
  }
});

router.put("/v2/account/enterpise/:id", function (req, res, next) {
  if (req.params.id && req.body.entId) {
    Account.UpdateEnterpriseWhenCreate(req.params.id, req.body.entId, function (
      err,
      rows
    ) {
      if (err) res.json(err);
      else res.status(200).json(true);
    });
  } else {
    res.status(204).json(false);
  }
});

// สร้าง Account ใน sql
router.post("/v2/account/create", function (req, res, next) {
  if (req.body) {
    Account.CreateAccount(req.body, function (err) {
      if (err) {
        res.json(err);
      } else {
        res.status(201).json(true);
      }
    });
  } else {
    res.status(204).json(false);
  }
});

// สร้าง user ใน firebase
router.post("/v2/account/auth", function (req, res, next) {
  if (req.body.uid) {
    Firebase.admin
      .auth()
      .getUser(req.body.uid)
      .then(function (userRecord) {
        Firebase.admin
          .auth()
          .updateUser(req.body.uid, {
            displayName: req.body.name,
            photoURL: req.body.picture
          })
          .then(function (userRecord) {
            res.status(200).json(true);
          })
          .catch(function (error) {
            console.log("error: ", error);
            res.status(204).json(false);
          });
      })
      .catch(function (error) {
        Firebase.admin
          .auth()
          .createUser({
            uid: req.body.uid,
            email: req.body.userEmail,
            emailVerified: false,
            password: req.body.lineId,
            phoneNumber: req.body.userPhoneNumber,
            displayName: req.body.name,
            photoURL: req.body.picture,
            disabled: false
          })
          .then(function (userRecord) {
            res.status(201).json(true);
          })
          .catch(function (error) {
            console.log("error: ", error);
            res.status(204).json(false);
          });
      });
  } else {
    res.status(204).json(false);
  }
});

router.post("/v2/account/token", function (req, res, next) {
  if (req.body.uid) {
    Firebase.admin
      .auth()
      .createCustomToken(req.body.uid)
      .then(function (customToken) {
        res.status(201).json(customToken);
      })
      .catch(function (error) {
        res.status(204).json(false);
      });
  } else {
    res.status(204).json(false);
  }
});

module.exports = router;