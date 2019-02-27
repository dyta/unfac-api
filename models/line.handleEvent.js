const engine = require('../config/line.bot')
const template = require('./line.msg.template')

handleEvent = async (event) => {
    switch (event.message.type) {
        case 'work_new':
            event.message.ids.forEach(element => {
                if (element.empLineId[0] === 'U') return engine.client.pushMessage(element.empLineId, {
                    "type": "flex",
                    "altText": `NEW WORK #${event.message.work.workId}`,
                    "contents": {
                        "type": "bubble",
                        "header": {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [{
                                "type": "text",
                                "text": `#${event.message.work.workId} - ${event.message.work.workName}`,
                                "size": "sm",
                                "weight": "bold",
                                "color": "#AAAAAA"
                            }]
                        },
                        "hero": {
                            "type": "image",
                            "url": event.message.work.workImages,
                            "size": "full",
                            "aspectRatio": "20:13",
                            "aspectMode": "cover",
                            "action": {
                                "type": "uri",
                                "label": "Action",
                                "uri": event.message.liff
                            }
                        },
                        "body": {
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "md",
                            "contents": [{
                                    "type": "box",
                                    "layout": "vertical",
                                    "flex": 1,
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "เริ่ม:",
                                                "size": "xs",
                                                "weight": "bold",
                                                "color": "#000000"
                                            }]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "Qty.:",
                                                "size": "xs",
                                                "weight": "bold"
                                            }]
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "flex": 2,
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": `${event.message.work.workStartAt}`,
                                                "size": "xs"
                                            }]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": `${event.message.work.workVolume}`,
                                                "size": "xs"
                                            }]
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "sm",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "สิ้นสุด:",
                                                "size": "xs",
                                                "weight": "bold",
                                                "color": "#000000"
                                            }]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": "ค่าจ้าง",
                                                "size": "xs",
                                                "weight": "bold",
                                                "color": "#000000"
                                            }]
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "flex": 2,
                                    "contents": [{
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": `${event.message.work.workEndAt}`,
                                                "size": "xs"
                                            }]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [{
                                                "type": "text",
                                                "text": `${event.message.work.workEarn}/${event.message.work.workEarnType === 1 ? 'ชิ้น' : 'เหมาจ่าย'}`,
                                                "size": "xs"
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                });
            });
            return Promise.resolve(null)
        case 'approve_your_work':
            return engine.client.pushMessage(event.message.work.empLineId, {
                "type": "flex",
                "altText": "งานของคุณได้รับอนุมัติแล้ว",
                "contents": {
                    "type": "bubble",
                    "header": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                            "type": "text",
                            "text": "งานของคุณได้รับอนุมัติแล้ว",
                            "size": "sm",
                            "weight": "bold",
                            "color": "#AAAAAA"
                        }]
                    },
                    "hero": {
                        "type": "image",
                        "url": event.message.work.workImages,
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover"
                    },
                    "body": {
                        "type": "box",
                        "layout": "horizontal",
                        "spacing": "md",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "flex": 1,
                                "contents": [{
                                    "type": "text",
                                    "text": "คำขอ",
                                    "size": "sm",
                                    "weight": "bold"
                                }, {
                                    "type": "text",
                                    "text": "อนุมัติ",
                                    "size": "sm",
                                    "weight": "bold"
                                }]
                            },
                            {
                                "type": "separator"
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "flex": 4,
                                "contents": [{
                                        "type": "text",
                                        "text": "จำนวน " + event.message.work.rwVolume + " รายการ",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "จำนวน " + event.message.work.approve + " รายการ",
                                        "size": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "ตรวจสอบรายละเอียดได้ที่เมนูงานของฉัน",
                                        "size": "xxs",
                                        "color": "#C1C1C1"
                                    }
                                ]
                            }
                        ]
                    }
                }
            });
        case 'approve_employee':
            return engine.client.pushMessage(event.message.employee.empLineId, {
                "type": "flex",
                "altText": "ได้รับการยืนยันการเป็นพนักงานเรียบร้อยแล้ว",
                "contents": {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [{
                                "type": "text",
                                "text": "การยืนยันสถานะของพนักงาน",
                                "size": "md",
                                "gravity": "center",
                                "weight": "bold",
                                "wrap": true
                            },
                            {
                                "type": "separator"
                            },
                            {
                                "type": "text",
                                "text": "คุณ" + event.message.employee.empFullname,
                                "size": "xs"
                            },
                            {
                                "type": "text",
                                "text": "ได้รับการยืนยันการเป็นพนักงานเรียบร้อยแล้ว",
                                "size": "xs"
                            },
                            {
                                "type": "text",
                                "text": "คุณสามารถเข้าใช้งานในเมนูเลือกงานได้ทันที",
                                "margin": "none",
                                "size": "xs"
                            },
                            {
                                "type": "filler"
                            },
                            {
                                "type": "text",
                                "color": '#cccccc',
                                "text": "REF: E" + event.message.employee.entId + "-U00" + event.message.employee.empId + "-T" + new Date().getTime(),
                                "size": "xxs"
                            }
                        ]
                    }
                }
            });
        case 'progress_your_work':
            return engine.client.pushMessage(event.message.employee.line, {
                "type": "flex",
                "altText": "การดำเนินการเสร็จสิ้นโปรดส่งมอบสินค้า",
                "contents": {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [{
                                "type": "text",
                                "text": "โปรดส่งมอบสินค้าแก่ต้นสังกัด",
                                "size": "md",
                                "gravity": "center",
                                "weight": "bold",
                                "wrap": true
                            },
                            {
                                "type": "separator"
                            },
                            {
                                "type": "text",
                                "text": "คุณ " + event.message.employee.name,
                                "size": "xs"
                            },
                            {
                                "type": "text",
                                "text": "ได้ดำเนินการเสร็จสิ้นโปรดส่งมอบสินค้าให้แก่",
                                "size": "xs"
                            },
                            {
                                "type": "text",
                                "text": "ต้นสังกัดเพื่อดำเนินการตรวจสอบ",
                                "margin": "none",
                                "size": "xs"
                            },
                            {
                                "type": "text",
                                "text": "*หากไม่สะดวกกรุณาติดต่อ " + event.message.employee.tel,
                                "margin": "none",
                                "size": "xs"
                            },
                            {
                                "type": "filler"
                            },
                            {
                                "type": "text",
                                "color": "#cccccc",
                                "text": "REF: MF" + event.message.employee.mfId + "-T" + event.message.employee.now,
                                "size": "xxs"
                            }
                        ]
                    }
                }
            });
        case 'text':
            switch (event.message.text) {
                case 'ดูงานของฉัน':
                    return engine.client.replyMessage(event.replyToken, template.AlertNewWork);
                default:
                    return Promise.resolve(null);
            }
        default:
            return Promise.resolve(null);
    }
}

module.exports = {
    handleEvent
}