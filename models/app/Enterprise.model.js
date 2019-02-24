const db = require("../../config/mysql.connect");

const Enterprise = {
    GetEnterprise: function (params, callback) {
        return db.query(
            "SELECT T2.`entId`, T2.`entName`, T2.`entDomain`, T2.`entTel`, T2.`entStatus` FROM `EnterpriseSetting` T1 JOIN `Enterprise` T2 ON T1.`entId` = T2.`entId` WHERE T1.`entId` = ? AND T1.`API_KEY` = ?;",
            [params.entId, params.key], callback
        );
    }
};
module.exports = Enterprise;