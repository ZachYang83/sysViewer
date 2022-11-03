<template></template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_ershoufangData } from "api/houseInfo/ershoufangInfo.js";

let ershoufang_data = [];
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
      get_ershoufangData("/house_info/secondhouse/all").then((res) => {
        var res_data = res.data.data;
        console.log(res_data, "res_data");
        for (let i = 0; i < res_data.length; i++) {
          var obj = {
            name: res_data[i].name,
            value: [
              res_data[i].lng,
              res_data[i].lat,
              res_data[i].name,
              res_data[i].sum,
              res_data[i].area,
              res_data[i].price,
              res_data[i].cq,
              res_data[i].time,
              res_data[i].fwyt,
              res_data[i].direction,
              res_data[i].gpprice,
              res_data[i].lcs,
              res_data[i].lc,
              res_data[i].jcnd,
              res_data[i].jzjg,
              res_data[i].jzlx,
            ],
          };
          ershoufang_data.push(obj);
        }
        console.log(ershoufang_data, "ershoufang_data");
        var option = {
          tooltip: {
            trigger: "item",
            formatter: function (d) {
              let info =
                "<strong style='font-size:15px'> 小区名称:" +
                d.value[2] +
                "</strong><br />  总成交价(万元): " +
                d.value[3] +
                "<br />  建筑面积: " +
                d.value[4] +
                "<br />  单价(元): " +
                d.value[5] +
                "<br />  房屋权属: " +
                d.value[6] +
                "<br />  房屋年限: " +
                d.value[7] +
                "<br />  房屋用途: " +
                d.value[8] +
                "<br />  房屋朝向: " +
                d.value[9] +
                "<br />  挂牌价格(万元): " +
                d.value[10] +
                "<br />  总楼层数: " +
                d.value[11] +
                "<br />  所在楼层: " +
                d.value[12];
              "<br />  建成年代: " + d.value[13];
              "<br />  建筑结构: " + d.value[14];
              "<br />  建筑类型: " + d.value[15];
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
              data: ershoufang_data,
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
                  color: "#ffa726",
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