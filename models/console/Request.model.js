const db = require("../../config/mysql.connect");

const request = {
    GetAllRequestWorkByEnterpriseId: function (params, callback) {
        return db.query(
            "SELECT T1.*, T3.`empPictureUrl`, T3.`empFullname`, T3.`empLineId`, T2.`workVolume`, T2.`workImages`, T4.`mfProgress`, T4.`mfUpdateAt`, T4.`mfId`" +
            "FROM `RequestWork` T1 " +
            "JOIN `Employee` T3 ON T3.`empId` = T1.`rwEmpId`" +
            "JOIN `Works` T2 ON T2.`workId` = T1.`rwWorkId`" +
            "LEFT JOIN `Manufacture` T4 ON T4.`rwId` = T1.`rwId` WHERE T1.`rwWorkId` = ? AND T2.`entId` = ? GROUP BY T1.`rwId` ORDER BY `rwUpdateAt` DESC;",
            [params.id, params.enterprise],
            callback
        );
    },
    CreateRequestSomeApprove: function (r, callback) {
        return db.query(
            "Insert into `RequestWork`(`rwEmpId`, `rwStartAt`, `rwEndAt`, `rwVolume`, `rwWorkId`, `rwStatus`, `rwCreateAt`,`rwUpdateAt`) values(?,?,?,?,?,?,now(),now())",
            [r.rwEmpId, r.rwStartAt, r.rwEndAt, r.approve, r.rwWorkId, r.newStatus],
            callback
        );
    },
    UpdateRequestSomeApprove: function (r, callback) {
        return db.query(
            "UPDATE `RequestWork` set `rwVolume`=? WHERE `rwId` = ?",
            [r.rwVolume - r.approve, r.rwId],
            callback
        );
    },
    UpdateRequestWorkStatus: function (r, p, callback) {
        return db.query(
            "UPDATE `RequestWork` set `rwStatus`=? WHERE `rwId` = ?",
            [r.newStatus, p],
            callback
        );
    }
};
module.exports = request;