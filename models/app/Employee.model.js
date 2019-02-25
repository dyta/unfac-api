const db = require("../../config/mysql.connect");

const Employee = {
    GetEmployeeByLineID: function (params, callback) {
        return db.query(
            "SELECT * FROM `Employee` WHERE `empLineId` = ? AND `entId` = ?;",
            [params.empLineId, params.entId], callback
        );
    },
    CreateEmployee: function (params, body, callback) {
        return db.query(
            "Insert into `Employee`(`entId`, `empLineId`, `empFullname`, `empDisplayName`, `empPictureUrl`, `createAt`) values(?,?,?,?,?,now());",
            [params.entId, params.empLineId, body.displayName, body.displayName, body.pictureUrl], callback
        );
    },
    UpdateEmployeeByLineID: function (params, body, callback) {
        return db.query(
            "UPDATE `Employee` SET `empDisplayName`= ?, `empPictureUrl`= ? WHERE `empLineId` = ?;",
            [body.displayName, body.pictureUrl, params.entId], callback
        );
    },
    UpdateEmployee: function (params, body, callback) {
        return db.query(
            "UPDATE `Employee` SET `empIdentity` = ? ,`empFullname` = ?, `empAddress` = ?, `empAddress2` = ?, `empPhoneNumber` = ?, `empStatus` = ? WHERE `empLineId` = ?;",
            [body.empIdentity, body.empFullname, body.empAddress, body.empAddress2, body.empPhoneNumber, body.empStatus, params], callback
        );
    }
};
module.exports = Employee;