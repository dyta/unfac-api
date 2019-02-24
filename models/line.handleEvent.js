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
                                    "text": "จำนวน",
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
                                        "text": event.message.work.approve + " รายการ",
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