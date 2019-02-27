const db = require("../../config/mysql.connect");

const Work = {
    GetAllWorks: function (entId, callback) {
        return db.query(
            "SELECT * FROM `Works` WHERE `entId` = ? ORDER BY `workId` DESC;",
            [entId], callback
        );
    },
    GetAllWorksForEvent: function (entId, callback) {
        return db.query(
            "SELECT `workName` AS `title`, `workId` AS `id`,`workStartAt` AS `start`, `workEndAt` AS `end` , `workStatus` AS `backgroundColor`, `customerName` AS `customer` FROM `Works` WHERE `entId` = ?;",
            [entId], callback
        );
    },
    GetWorksRecentEnd: function (date, callback) {
        return db.query(
            "SELECT * FROM Works WHERE `entId` = ? AND (`workEndAt` BETWEEN ? AND ?) ORDER BY `workEndAt` DESC LIMIT 0,5;",
            [date.entId, date.start, date.end], callback
        );
    },
    GetPublishedWorks: function (entId, callback) {
        return db.query(
            "SELECT `workId`, `workVolume`, `workImages`, `workEndAt` , `workStatus`, `workUpdateAt`,`workName`, " +
            "(SELECT COUNT( * ) FROM RequestWork WHERE `rwStatus` = 1 AND `workId` = `rwWorkId`) AS `pending`, " +
            "(SELECT COUNT( * ) FROM RequestWork WHERE `rwStatus` = 2 AND `workId` = `rwWorkId`) AS `approved`, " +
            "(SELECT COUNT( * ) FROM RequestWork WHERE `rwStatus` = 4 AND `workId` = `rwWorkId`) AS `complete`, " +
            "(SELECT SUM(rwVolume) FROM RequestWork WHERE `rwStatus` = 1 AND `workId` = `rwWorkId`) AS `pendingSum`, " +
            "(SELECT SUM(rwVolume) FROM RequestWork WHERE `rwStatus` = 2 AND `workId` = `rwWorkId`) AS `approvedSum`, " +
            "(SELECT SUM(rwVolume) FROM RequestWork WHERE `rwStatus` = 4 AND `workId` = `rwWorkId`) AS `completeSum`" +
            " FROM `Works` WHERE `workStatus` > 2 AND `entId` = ? GROUP BY `workId` ORDER BY `workStatus` DESC, `workEndAt` DESC;",
            [entId],
            callback
        );
    },
    UpdateImageForWork: function (id, path, callback) {
        return db.query(
            "UPDATE `Works` SET `workImages` = ? WHERE `workId` = ?;",
            [path.workImages, id], callback
        );
    },
    UpdateStatusForWork: function (id, path, callback) {
        return db.query(
            "UPDATE `Works` SET `workStatus` = ? WHERE `workId` = ?;",
            [path.workStatus, id], callback
        );
    },
    UpdateInformationForWork: function (id, data, callback) {
        return db.query(
            "UPDATE `Works` SET `workName` = ?, `workDescription` = ?, `workStartAt` = ?, `workEndAt` = ?, `workEarn` = ? , `workEarnType` = ? WHERE `workId` = ?;",
            [data.workName, data.workDescription, new Date(data.workStartAt), new Date(data.workEndAt), data.workEarn, data.workEarnType, id], callback
        );
    },
    AddWork: function (data, callback) {
        return db.query(
            "INSERT INTO `Works`(`customerName`, `entId`, `issuedBy`, `workDescription`, `workEarn`, `workEarnType`, `workEndAt`, `workImages`, `workName`, `workStartAt`, `workType`, `workVolume`, `workCreateAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, now());",
            [data.customerName, data.entId, data.issuedBy, data.workDescription, data.workEarn, data.workEarnType, new Date(data.workEndAt), data.workImages, data.workName, new Date(data.workStartAt), data.workType, data.workVolume], callback
        );
    },
    RemoveWork: function (data, callback) {
        return db.query(
            "DELETE FROM `Works` WHERE `workId`= ? AND `entId` =?;",
            [data.id, data.enterprise], callback
        );
    },
};
module.exports = Work;