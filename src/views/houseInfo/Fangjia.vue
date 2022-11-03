<template></template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_fangjiaData } from "api/houseInfo/fangjiaInfo.js";

let fangjia_data = [];
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
      get_fangjiaData("/house_info/house-price/all").then((res) => {
        var res_data = res.data.data;
        console.log(res_data, "res_data");
        for (let i = 0; i < res_data.length; i++) {
          var obj = {
            name: res_data[i].name,
            value: [
              res_data[i].lng,
              res_data[i].lat,
              res_data[i].name,
              res_data[i].price,
              res_data[i].time,
              res_data[i].jzjg,
              res_data[i].jzlx,
              res_data[i].lhl,
              res_data[i].rjl,
              res_data[i].chanquan,
              res_data[i].ldzs,
              res_data[i].lwzs,
              res_data[i].zdarea,
              res_data[i].jzarea,
            ],
          };
          fangjia_data.push(obj);
        }
        console.log(fangjia_data, "fangjia_data");
        var option = {
          tooltip: {
            trigger: "item",
            formatter: function (d) {
              let info =
                "<strong style='font-size:15px'> 小区名称:" +
                d.value[2] +
                "</strong><br />  小区均价: " +
                d.value[3] +
                "<br />  建筑年代: " +
                d.value[4] +
                "<br />  建筑结构: " +
                d.value[5] +
                "<br />  建筑类型: " +
                d.value[6] +
                "<br />  绿化率: " +
                d.value[7] +
                "<br />  容积率: " +
                d.value[8] +
                "<br />  产权: " +
                d.value[9] +
                "<br />  楼栋总数: " +
                d.value[10] +
                "<br />  房屋总数: " +
                d.value[11] +
                "<br />  占地面积: " +
                d.value[12];
              "<br />  建筑面积: " + d.value[13];
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
              name: "fangjiaInfo",
              type: "scatter",
              coordinateSystem: "GLMap",
              data: fangjia_data,
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