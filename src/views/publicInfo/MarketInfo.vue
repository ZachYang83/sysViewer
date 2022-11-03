<template></template>

<script>
// import "mapbox-gl/dist/mapbox-gl.css";
// window.echarts = require("utils/echarts-all-3.js");
// import echarts from "echarts";
// window.echarts = echarts;
import EchartsLayer from "utils/EchartsLayer.js";
// window.EchartsLayer = require("utils/EchartsLayer.js");
// console.log(window.echarts, "_echarts");
import { get_markData } from "api/publicInfo/marketInfo.js";

let mark_data = [];
let echartslayer = null;
export default {
  mounted() {
    this.init();
    this.setScatter();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 23.1]);
      window.MAP.setZoom(12);
    },
    setScatter() {
      get_markData("/public_info/pub-market/all").then((res) => {
        var res_data = res.data.data;
        console.log(res_data, "res_data");
        for (let i = 0; i < res_data.length; i++) {
          var obj = {
            name: res_data[i].name,
            value: [
              res_data[i].lng,
              res_data[i].lat,
              res_data[i].name,
              res_data[i].address,
              res_data[i].district,
              res_data[i].street,
              res_data[i].yyf,
              res_data[i].time,
              res_data[i].wyq,
              res_data[i].wyqs,
              res_data[i].area,
              res_data[i].shs,
              res_data[i].jypl,
              res_data[i].lxfs,
            ],
          };
          mark_data.push(obj);
        }
        console.log(mark_data, "mark_data");
        var option = {
          tooltip: {
            trigger: "item",
            formatter: function (d) {
              let info =
                "<strong style='font-size:15px'>市场名称:" +
                d.value[2] +
                "</strong><br />  地址: " +
                d.value[3] +
                "<br />  所在区: " +
                d.value[4] +
                "<br />  所在街: " +
                d.value[5] +
                "<br />  市场运营方: " +
                d.value[6] +
                "<br />  开办时间: " +
                d.value[7] +
                "<br />  物业权: " +
                d.value[8] +
                "<br />  物业权属: " +
                d.value[9] +
                "<br />  建筑面积: " +
                d.value[10] +
                "<br />  商户数: " +
                d.value[11] +
                "<br />  经营品类: " +
                d.value[12];
              "<br />  市场联系方式: " + d.value[13];
              return info;
            },
          },
          GLMap: {
            roam: false,
          },
          coordinateSystem: "GLMap",
           Progressive: 0,
          series: [
            {
              name: "eduInfo",
              type: "scatter",
              coordinateSystem: "GLMap",
              data: mark_data,
              symbolSize: 10,
              large: true,
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#ff1744",
                },
                emphasis: {
                  borderColor: "#fff",
                  borderWidth: 1,
                },
              },
            },
          ],
        };
        echartslayer = new EchartsLayer(window.MAP);
        console.log(echartslayer, "echartslayer");
        echartslayer.chart.setOption(option);
      });
    },
  },
  destroyed() {
    echartslayer.remove();
    window.MAP.setCenter([113.35, 23.1]);
  },
};
</script>

<style lang="scss" scoped>
.echartMap div {
  position: absolute;
  overflow: auto;
}
</style>