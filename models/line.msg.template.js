const AlertNewWork = {
    "type": "flex",
    "altText": "มีงานมาใหม่",
    "contents": {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
            "type": "image",
            "url": "https://developers.line.biz/assets/images/services/bot-designer-icon.png",
            "size": "full",
            "aspectRatio": "1.51:1",
            "aspectMode": "fit"
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [{
                "type": "button",
                "action": {
                    "type": "uri",
                    "label": "เปิดดูตอนนี้",
                    "uri": "line://app/1645659436-lGWpJ4rB"
                }
            }]
        }
    }
}

module.exports = {
    AlertNewWork
}