const db = require("../../config/mysql.connect");

const Enterprise = {
    GetMaunufactureByEmployee: function (params, callback) {
        return db.query(
            "SELECT T1.*, T2.`workName`, T2.`workImages` , T2.`workEarn`, T2.`workEarnType` FROM `Manufacture` T1 JOIN `Works` T2 ON T2.`workId` = T1.`workId` WHERE `empId` = ? ;",
            [params.employee], callback
        );
    },
    UpdateProgress: function (params, callback) {
        return db.query(
            "UPDATE `anm_database`.`Manufacture` SET `mfProgress` = ? WHERE `mfId` = ?;",
            [(params.progress + params.mfProgress), params.mfId], callback
        );
    }


};
module.exports = Enterprise;