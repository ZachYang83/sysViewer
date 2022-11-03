/*
 * @Author: your name
 * @Date: 2021-09-11 16:42:13
 * @LastEditTime: 2022-01-06 20:17:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gpzi-web\src\js\timeline.js
 */
import * as echarts from "echarts";
 
let _tlJson = {
    timeline: {
        axisType: 'category',
        lineStyle: {
            show: true
        },
        symbol: "circle",
        itemStyle: {
            normal: {
                color: "rgba(194,53,49, 0.5)"
            }
        },
        controlStyle: {
            showPrevBtn: true,
            showNextBtn: true,
            normal: {
                color: "rgba(194,53,49, 0.5)",
                borderColor: "rgba(194,53,49, 0.5)"
            }
        },
        orient: "vertical",
        inverse: true,
        x: null,
        x2: 0,
        y: 0,
        width: 55,
        height: "98%",
        loop: false,
        autoPlay: false,
        playInterval: 1000,
        realtime : true,
    },
    baseOption: {
        tooltip: {
            'trigger': 'axis'
        },
    }
};
 
export default class Timeline {
    constructor() {
        this.chart = undefined;
        this.lastIndex = 0;
    }
 
    static makeTimeline(el, dataJson,callback) {
        let tl = new Timeline();
        let count = dataJson.timeline.data.length;
        let option = echarts.util.merge(_tlJson, dataJson, true);
 
        option = option || {};
        tl.chart = echarts.init(el, null, {});
        tl.chart.on("timelineChanged", (params) => {
            let lastIndex = tl.lastIndex;
            let curIndex = params.currentIndex;
            console.log("last index:" + lastIndex + ",current index:" + curIndex);
            if (count === 0) {
                console.log("no data.");
                return;
            } else if (lastIndex != curIndex) {
                tl.lastIndex = curIndex;
                console.log("move " + lastIndex + " to " + curIndex);
                callback.callback(tl, params);
            } else if (lastIndex === curIndex) {
                if (lastIndex === 0) {
                    callback.last(tl, params);
                } else {
                    callback.next(tl, params);
                }
            }
        });
 
        tl.chart.setOption(option);
    }
 
    update(dataJson) {
        let option = echarts.util.merge(_tlJson, dataJson, true);
        let lastIndex = option.timeline.currentIndex;
        this.chart.setOption(option);
        if (lastIndex != undefined) {
            this.lastIndex = lastIndex;
        } else {
            this.lastIndex = 0;
        }
    }
}