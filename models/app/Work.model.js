const db = require("../../config/mysql.connect");

const Work = {
    GetPublishedWorks: function (entId, callback) {
        return db.query(
            "SELECT `workId`, `workVolume`,`workName`,`workDescription`, `workImages`, `workEndAt` , `workStatus`, `workUpdateAt`,`workEarn`,`workEarnType`, `workPickVolume`, `workStartAt`, " +
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
    UpdateWorkWhenRequestWork: function (r, callback) {
        return db.query(
            "UPDATE `Works` set `workPickVolume`=? WHERE `workId` = ?",
            [r.workPickVolume, r.rwWorkId],
            callback
        );
    },
};
module.exports = Work;