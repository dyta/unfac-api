const db = require("../../config/mysql.connect");

const Work = {
    GetAllEmployees: function (entId, callback) {
        return db.query(
            "SELECT * FROM `Employee` WHERE `entId` = ?;",
            [entId], callback
        );
    },
    GetAllEmployeesForNotification: function (entId, callback) {
        return db.query(
            "SELECT `empLineId` FROM `Employee` WHERE `entId` = ? AND `empStatus` = 3 AND `userAuth` = 1;",
            [entId], callback
        );
    }
};
module.exports = Work;