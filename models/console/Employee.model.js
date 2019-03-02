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
    },
    GetAllEmployeesForNotificationManual: function (entId, callback) {
        return db.query(
            "SELECT `empFullname` AS `name`, `empLineId` AS `key`, `empStatus` AS `disabled` FROM `Employee` WHERE `entId` = ?;",
            [entId], callback
        );
    },
    UpdateWhenConfirm: function (d, b, callback) {
        return db.query(
            "UPDATE `Employee` SET `empStatus` = 3, `userAuth` = ? WHERE `empId` = ?;",
            [b, d.empId], callback
        );
    },
    UpdateCapacityById: function (num, id, callback) {
        return db.query(
            "UPDATE `Employee` SET `empCapacity` = ? WHERE `empId` = ?;",
            [num, id], callback
        );
    },
};
module.exports = Work;