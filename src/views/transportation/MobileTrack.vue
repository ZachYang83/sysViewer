<template></template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_mobileData } from "api/transportation/mobile.js";

let echartslayer = null;
export default {
  mounted() {
    this.init();
    this.setTrack();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 23.1]);
      window.MAP.setZoom(12);
    },
    setTrack() {
      get_mobileData("/tra_monitor/od-bike/all").then((res) => {
        var mbOd_data = res.data.data;
        let data1 = [];
        for (let i = 0; i < mbOd_data.length; i++) {
          if (mbOd_data[i].olon != 0 && mbOd_data[i].dlon != 0) {
            var od1 = [
              { coord: [mbOd_data[i].olon, mbOd_data[i].olat] },
              { coord: [mbOd_data[i].dlon, mbOd_data[i].dlat] },
            ];
            data1.push(od1);
          }
        }
        var option = {
          tooltip: {
            trigger: "item",
          },
          GLMap: {
            roam: false,
          },
          coordinateSystem: "GLMap",
          series: [
            {
              type: "lines",
              coordinateSystem: "GLMap",
              zlevel: 2,
              effect: {
                show: true,
                color: "orange",
                symbolSize: 1,
                constantSpeed: 20, // 点移动的速度
              },
              lineStyle: {
                normal: {
                  color: "orange",
                  width: 0,
                  opacity: 0.6,
                  curveness: 0.2,
                },
              },
              data: data1,
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
</style>