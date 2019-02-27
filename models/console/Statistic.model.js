const db = require("../../config/mysql.connect");

const Statistic = {
  GetCountStatistics: function (entId, callback) {
    return db.query(
      "SELECT " +
      "(SELECT COUNT(`workId`) FROM Works ) AS `w_all`," +
      "(SELECT COUNT(`workId`) FROM Works WHERE `workStatus` > 2 AND `workStatus` < 5 ) AS `w_enabled`," +
<<<<<<< HEAD
      "(SELECT COUNT(S2.*) FROM RequestWork S2 JOIN Works S1 ON S1.`workId` = S2.`rwWorkId` WHERE S2.`rwStatus` = 1 AND S1.`workStatus` > 2) AS `w_request`, " +
=======
      "(SELECT COUNT(*) FROM RequestWork S2 JOIN Works S1 ON S1.`workId` = S2.`rwWorkId` WHERE S2.`rwStatus` = 1 AND S1.`workStatus` > 2) AS `w_request`, " +
>>>>>>> countState
      "(SELECT SUM(`maxVolume`) FROM Manufacture WHERE `mfStatus` < 4) AS `unit_process`," +
      "(SELECT SUM(`workVolume`) FROM Works WHERE `workStatus` > 2 AND `workStatus` < 5) AS `unit_enabled`," +
      "(SELECT SUM(S2.`rwVolume`) FROM RequestWork S2 JOIN Works S1 ON S1.`workId` = S2.`rwWorkId` WHERE S2.`rwStatus` = 2 AND S1.`workStatus` > 2 AND S1.`workStatus` < 5) AS `unit_approved`," +
      "(SELECT SUM(S2.`rwVolume`) FROM RequestWork S2 JOIN Works S1 ON S1.`workId` = S2.`rwWorkId` WHERE S2.`rwStatus` = 1 AND S1.`workStatus` > 2 AND S1.`workStatus` < 5) AS `unit_request`, " +
      "(SELECT SUM(`maxVolume`) FROM Manufacture WHERE `mfStatus` = 2 ) AS `unit_check` " +
      "FROM `Manufacture` T1 " +
      "LEFT JOIN `RequestWork` T2 on T2.`rwId` = T1.`rwId` " +
      "JOIN `Works` T3 on T3.`workId` = T2.`rwWorkId` " +
      "WHERE T2.`rwStatus` > 1 AND T3.`entId` = ? AND `mfStatus` < 4 LIMIT 0,1;",
      [entId],
      callback
    );
  }
};
module.exports = Statistic;