const db = require("../../config/mysql.connect");

const Report = {
    getReportByMouth: function (d, m, callback) {
        return db.query(
            "SELECT T1.*, T2.`mfId`, T2.`maxVolume`, T2.`mfStatus`, T3.`empFullname` " +
            "FROM `Works` T1 " +
            "LEFT JOIN `Manufacture` T2 ON T2.`workId` = T1.`workId` " +
            "LEFT JOIN `Employee` T3 ON T3.`empId` = T2.`empId` " +
            "WHERE T1.`entId` = ? AND T1.`workEndAt` LIKE ?;",
            [d, m],
            callback
        );
    },
    getAllTotalPrice: function (d, m, callback) {
        return db.query(
            "SELECT SUM(W.workVolume*W.workEarn) AS `alls` FROM Works W WHERE W.entId = ? AND W.workEndAt LIKE ?;",
            [d, m],
            callback
        );
    },

};
module.exports = Report;