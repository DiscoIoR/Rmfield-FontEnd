export function ts2Date(ts){
    let date = new Date(ts)
    let y = date.getFullYear().toString()
    let M = (date.getMonth() + 1).toString()
    let d = date.getDate().toString()
    let H = date.getHours().toString()
    let m = date.getMinutes().toString()
    let s = date.getSeconds().toString()
    return y + '/' + M + '/' + d + ' ' + H + ':' + m + ':' + s
}

/*
* dateStr   日期字符串,格式"yy-MM-dd"
* offset    设置时间补偿值,单位毫秒
 */
export function date2TS(dateStr, offset=0){
    let date = new Date(dateStr)
    date.setMilliseconds(date.getMilliseconds() +offset)
    let ts = date.getTime()
    if (isNaN(ts)){
        return 0
    }else {
        return ts
    }
}