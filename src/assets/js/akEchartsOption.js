import * as echarts from 'echarts'
export function setGachaGeneral(){
    let gachaGeneral = echarts.init(document.querySelector("#gachaGeneral"))
    gachaGeneral.setOption({
        title: {
            text: '寻访结果统计',
            top: 10,
            left: 20
        },
        tooltip: {
            trigger: 'item',
            borderWidth: 2,
            formatter: function (val) {
                return `<div>
      <span style="font-size:14px; float: left;">${val.marker}  ${val.name}</span>
      &nbsp;&nbsp;&nbsp;
      <span style="font-size:14px; font-weight: bold; float: right;"> ${val.value}</span><br>
      <span style="font-size:14px; font-weight: bold; float: right;"> ${val.percent}%</span>
      </div>`
            }
        },
        legend: {
            orient: 'vertical',
            top:"22%",
            left:'10%',
        },
        series: [
            {
                type: 'pie',
                top:"10%",
                left:'30%',
                radius: ['45%', '75%'],
                color: [
                    '#ff3600',
                    '#fbc600',
                    '#d685ff',
                    '#94daff',
                    '#91cc75',
                    '#ea7ccc',
                    '#5470c6'
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{total|total}' + '\n\r' + '{active|' + 0 + '}',
                    rich: {
                        total: {
                            fontSize: 16,
                            color: '#00000073'
                        },
                        active: {
                            fontSize: 20,
                            color: '#000',
                            lineHeight: 44,
                        },
                    }
                },
                data: [
                    {value: 0, name: '6星'},
                    {value: 0, name: '5星'},
                    {value: 0, name: '4星'},
                    {value: 0, name: '3星'}
                ]
            }
        ]
    })
    return gachaGeneral
}

export function setGachaByPool(){
    let gachaByPool = echarts.init(document.getElementById("gachaByPool"))
    gachaByPool.setOption({
        title: {
            text: '按卡池统计',
            top: 10,
            left: 20
        },
        grid: {
            top: 50,
            height: '50%'
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(0, 0, 0, 1)"
                    }
                },
                axisLabel: {
                    fontSize: 11,
                    width:50,
                    overflow: 'truncate',
                    hideOverlap: false,
                    interval: 0
                },
                axisTick: {
                    interval: 0
                },
                z: 5
            }
        ],
        yAxis: [
            {
                show: true,
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(0, 0, 0, 1)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(50, 50, 50, 0)",
                        type: "dashed",
                        width: 1.5,
                    }
                },
                z: 5
            }
        ],
        dataZoom: [
            {
                show: true,
                bottom: 'auto',
                height: 16,
                start: 0,
                end: 100,
                brushSelect: false,
                handleStyle: {
                    color: "#256b66",
                },
                handleSize: '150%',
                borderColor: 'rgba(0,0,0,0.25)',
                backgroundColor: 'rgba(0,0,0,0)',
                dataBackground: {
                    lineStyle: {
                        color: "rgba(0, 115, 255, 1)"
                    },
                    areaStyle: {
                        color: "rgb(121,121,121)"
                    }
                },
                fillerColor: 'rgba(0,0,0,0.1)',
                selectedDataBackground: {
                    lineStyle: {
                        color: '#39C5BB'
                    },
                    areaStyle: {
                        color: '#66CCFF'
                    }
                }
            },
            {
                type: 'inside',
                zoomOnMouseWheel: false,
                moveOnMouseWheel: false,
                preventDefaultMouseMove: false
            }
        ],
        series: [
            {
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    textBorderColor: "rgba(0, 0, 0, 0)",
                    fontSize: 9
                },
                tooltip: {
                    trigger: 'axis'
                },
                data: [],
                itemStyle: {
                    color: '#66ccff'
                },
                markLine: {
                    data: [{type: 'average', name: 'Avg'}],
                    symbol: ['none', 'circle'],
                    symbolSize: 3,
                    lineStyle: {
                        color: 'rgba(65,94,154,0.5)',
                        type: 'solid',
                        width: 1.8,
                    },
                    label: {
                        textBorderColor: "rgba(0, 0, 0, 0)",
                        color: 'rgba(65,94,154,1)',
                        fontSize: 9
                    }
                }
            }
        ]
    })
    return gachaByPool
}

export function setGachaByMonth(){
    let gachaByMonth = echarts.init(document.getElementById("gachaByMonth"))
    gachaByMonth.setOption({
        title: {
            text: '按月统计',
            top: 10,
            left: 20
        },
        grid: {
            top: 50,
            height: '50%'
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(0, 0, 0, 1)"
                    }
                },
                axisLabel: {
                    fontSize: 11,
                    width:50,
                    overflow: 'truncate',
                    hideOverlap: false,
                    interval: 0
                },
                axisTick: {
                    interval: 0
                },
                z: 5
            }
        ],
        yAxis: [
            {
                show: true,
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(0, 0, 0, 1)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(50, 50, 50, 0)",
                        type: "dashed",
                        width: 1.5,
                    }
                },
                z: 5
            }
        ],
        dataZoom: [
            {
                show: true,
                bottom: 'auto',
                height: 16,
                start: 0,
                end: 100,
                brushSelect: false,
                handleStyle: {
                    color: "#256b66",
                },
                handleSize: '150%',
                borderColor: 'rgba(0,0,0,0.25)',
                backgroundColor: 'rgba(0,0,0,0)',
                dataBackground: {
                    lineStyle: {
                        color: "rgba(0, 115, 255, 1)"
                    },
                    areaStyle: {
                        color: "rgb(121,121,121)"
                    }
                },
                fillerColor: 'rgba(0,0,0,0.1)',
                selectedDataBackground: {
                    lineStyle: {
                        color: '#39C5BB'
                    },
                    areaStyle: {
                        color: '#66CCFF'
                    }
                }
            },
            {
                type: 'inside',
                zoomOnMouseWheel: false,
                moveOnMouseWheel: false,
                preventDefaultMouseMove: false
            }
        ],
        series: [
            {
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    textBorderColor: "rgba(0, 0, 0, 0)",
                    fontSize: 9
                },
                tooltip: {
                    trigger: 'axis'
                },
                data: [],
                itemStyle: {
                    color: '#66ccff'
                },
                markLine: {
                    data: [{type: 'average', name: 'Avg'}],
                    symbol: ['none', 'circle'],
                    symbolSize: 3,
                    lineStyle: {
                        color: 'rgba(65,94,154,0.5)',
                        type: 'solid',
                        width: 1.8,
                    },
                    label: {
                        textBorderColor: "rgba(0, 0, 0, 0)",
                        color: 'rgba(65,94,154,1)',
                        fontSize: 9
                    }
                }
            }
        ]
    })
    return gachaByMonth
}