const db = require("../../config/mysql.connect");

const request = {
    CreateRequestWork: function (r, callback) {
        return db.query(
            "Insert into `RequestWork`(`rwEmpId`, `rwStartAt`, `rwEndAt`, `rwVolume`, `rwCreateAt`, `rwWorkId`) values(?,?,?,?,now(),?)",
            [r.rwEmpId, r.rwStartAt, r.rwEndAt, r.rwVolume, r.rwWorkId],
            callback
        );
    }
};
module.exports = request;