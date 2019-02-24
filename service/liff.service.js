const request = require('request');
const apiRoute = 'https://api.line.me/liff/v1/apps';

const LIFF = {

    getLiff(id, publick_key, token, size, path) {
        return new Promise(function (resolve, reject) {
            try {
                let body = JSON.stringify({
                    view: {
                        type: size,
                        url: `https://app.unfac.co${path}?appid=${id}&key=${publick_key}`
                    }
                })
                return request.post({
                    url: apiRoute,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: body
                }, (err, res, body) => {
                    let liffId = null;
                    let result = false;
                    if (typeof JSON.parse(res.body).liffId != 'undefined') {
                        result = true;
                        liffId = JSON.parse(res.body).liffId;
                    }
                    return resolve({
                        result: result,
                        liffId: liffId
                    });
                });
            } catch (e) {
                return reject(e);
            }
        });
    }
}
module.exports = LIFF