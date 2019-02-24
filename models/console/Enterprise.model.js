const db = require("../../config/mysql.connect");

const Enterpise = {
  CreateNewEnterprise: function (key, src, callback) {
    return db.query(
      "Insert into `Enterprise`(`entName`, `entPackage`, `entAddress`, `entTel`, `entIdentity`, `entKeyInvite`, `entCreateAt`) values(?,?,?,?,?,?, now())",
      [
        src.entName,
        src.entPackage,
        src.entAddress,
        src.entTel,
        src.entIdentity,
        key
      ],
      callback
    );
  },

  hasCode: function (key, callback) {
    return db.query(
      "SELECT `entId`, `entName`, `entKeyInvite` FROM `Enterprise` WHERE `entKeyInvite` = ?;",
      [key],
      callback
    );
  }
};
module.exports = Enterpise;