const db = require("../../config/mysql.connect");

const manufacture = {
    GetAllManufactureByEnterpriseId: function (params, callback) {
        return db.query(
            "SELECT T1.*, T2.`empPictureUrl`, T2.`empFullname`, T3.`rwStatus`, T3.`rwVolume`, T4.`entId` " +
            "FROM `Manufacture` T1 " +
            "JOIN `Employee` T2 ON T2.`empId` = T1.`empId` " +
            "JOIN `RequestWork` T3 ON T3.`rwId` = T1.`rwId` " +
            "JOIN `Works` T4 ON T1.`workId` = T4.`workId` " +
            "WHERE T1.`workId` = ? AND T4.`entId` = ?;",
            [params.id, params.enterprise],
            callback
        );
    },
    CreateManufactureNewRequest: function (r, newRequest, callback) {

        return db.query(
            "Insert into `Manufacture` (`maxVolume`,`rwId`, `empId`, `workId`, `rwEndAt`, `mfStartAt`, `mfCreateAt`,`mfUpdateAt`) values(?,?,?,?,?,now(),now(),now())",
            [r.approve, newRequest, r.rwEmpId, r.rwWorkId, r.rwEndAt],
            callback
        );
    },
    CreateManufacture: function (r, callback) {
        return db.query(
            "Insert into `Manufacture` (`maxVolume`,`rwId`, `empId`, `workId`, `rwEndAt`, `mfStartAt`, `mfCreateAt`,`mfUpdateAt`) values(?,?,?,?,?,now(),now(),now())",
            [r.rwVolume, r.rwId, r.rwEmpId, r.rwWorkId, r.rwEndAt],
            callback
        );
    },
    GetManufactureProcessing: function (entId, callback) {
        return db.query(
            "SELECT T1.*, T3.`workStatus`, T3.`workImages`, T3.`workEndAt`, T3.`workStartAt`, T3.`workVolume`, " +
            "(SELECT SUM( `maxVolume` ) FROM Manufacture WHERE `mfStatus` < 4 AND `workId` = `rwWorkId`) AS `mfAllProcess`," +
            "(SELECT SUM(`maxVolume`) FROM Manufacture WHERE `mfStatus` = 4 AND `workId` = `rwWorkId`) AS `mfAllSuccess`" +
            "FROM `Manufacture` T1 " +
            "LEFT JOIN `RequestWork` T2 on T2.`rwId` = T1.`rwId` JOIN `Works` T3 on T3.`workId` = T2.`rwWorkId` " +
            "WHERE T2.`rwStatus` > 1 AND T3.entId = ? GROUP BY T3.`workId` ORDER BY T3.`workStatus` DESC, T3.`workEndAt` DESC;",
            [entId],
            callback
        );
    },
    UpdateManufactureProcessing: function (data, callback) {
        return db.query(
            "UPDATE `Manufacture` set `mfStatus`= ? WHERE `mfId` = ? AND `workId` = ?",
            [data.toStatus, data.mfId, data.workId],
            callback
        );
    },
    UpdateManufactureWhenRequestWorkCancel: function (data, callback) {
        let cals = data.rwVolume - (data.mfProgress + data.approve * 1)
        cals === 0 ? cals = 1 : cals
        return db.query(
            "UPDATE `Manufacture` set `maxVolume`= ? WHERE `mfId` = ?",
            [cals, data.mfId],
            callback
        );
    },
    DeleteManufactureWhenRequestWorkCancel: function (data, callback) {
        return db.query(
            "UPDATE `Manufacture` set `mfStatus`= 5 WHERE `mfId` = ?",
            [data.mfId],
            callback
        );
    },

};
module.exports = manufacture;