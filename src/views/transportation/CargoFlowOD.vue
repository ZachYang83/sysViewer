<template>
  <Legend
    :title="title"
    :items="items"
    :legentText="legentText"
    style="bottom: 40px; left: 10px; width: 200px; height: auto"
  >
  </Legend>
</template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_cargoData } from "api/transportation/cargo.js";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import Legend from "components/common/Legend.vue";
let echartslayer = null;
export default {
  data() {
    return {
      title: "图例",
      legentText: "flex:3",
      items: [
        {
          index: 1,
          text: "1020 ~ 4487",
          style: "backgroundColor:rgba(254,1,1,0.8)",
        },
        {
          index: 2,
          text: "663 ~ 1020",
          style: "backgroundColor:rgba(254,52,52,0.8)",
        },
        {
          index: 3,
          text: "306 ~ 663",
          style: "backgroundColor:rgba(254,154,154,0.8)",
        },
        {
          index: 4,
          text: "10 ~ 306",
          style: "backgroundColor:rgba(254,154,154,0.8)",
        },
      ],
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.initLayers();
    this.setTrack();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(6.7);
    },
    initLayers() {
      var dadushi = {
        "line-color": "#eeeeee",
        "line-width": 1,
      };
      // add_tms(window.MAP, "BigBay3", "line", dadushi);
    },
    setTrack() {
      get_cargoData("/tra_monitor/od-trucks/all").then((res) => {
        var truckOd_data = res.data.data;
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];
        for (let i = 0; i < truckOd_data.length; i++) {
          if (truckOd_data[i].x1 != 0 && truckOd_data[i].xx1 != 0) {
            var od1 = [
              { coord: [truckOd_data[i].x1, truckOd_data[i].y1] },
              { coord: [truckOd_data[i].xx1, truckOd_data[i].yy1] },
            ];
            data1.push(od1);
          }
          if (truckOd_data[i].x2 != 0 && truckOd_data[i].xx2 != 0) {
            var od2 = [
              { coord: [truckOd_data[i].x2, truckOd_data[i].y2] },
              { coord: [truckOd_data[i].xx2, truckOd_data[i].yy2] },
            ];
            data2.push(od2);
          }
          if (truckOd_data[i].x3 != 0 && truckOd_data[i].xx3 != 0) {
            var od3 = [
              { coord: [truckOd_data[i].x3, truckOd_data[i].y3] },
              { coord: [truckOd_data[i].xx3, truckOd_data[i].yy3] },
            ];
            data3.push(od3);
          }
          if (truckOd_data[i].x4 != 0 && truckOd_data[i].xx4 != 0) {
            var od4 = [
              { coord: [truckOd_data[i].x4, truckOd_data[i].y4] },
              { coord: [truckOd_data[i].xx4, truckOd_data[i].yy4] },
            ];
            data4.push(od4);
          }
        }
        var option = {
          GLMap: {
            roam: true,
          },
          coordinateSystem: "GLMap",
          series: [
            {
              type: "lines",
              coordinateSystem: "GLMap",
              zlevel: 2,
              lineStyle: {
                normal: {
                  color: "#fe9a9a",
                  width: 0.5,
                  opacity: 0.6,
                  curveness: 0.2,
                },
              },
              data: data1,
            },
            {
              type: "lines",
              coordinateSystem: "GLMap",
              zlevel: 2,
              effect: {
                show: true,
                // period: 10,
                // trailLength: 0,
                color: "#fff",
                // symbol: planePath,
                symbolSize: 0.2,
                constantSpeed: 5, // 点移动的速度
              },
              lineStyle: {
                normal: {
                  color: "#fe6767",
                  width: 1,
                  opacity: 0.6,
                  curveness: 0.2,
                },
              },
              data: data2,
            },
            {
              type: "lines",
              coordinateSystem: "GLMap",
              zlevel: 2,
              effect: {
                show: true,
                // period: 10,
                // trailLength: 0,
                // symbol: planePath,
                symbolSize: 0.4,
                constantSpeed: 5, // 点移动的速度
                color: "#fff",
              },
              lineStyle: {
                normal: {
                  color: "#fe3434",
                  width: 1.5,
                  opacity: 0.6,
                  curveness: 0.2,
                },
              },
              data: data3,
            },
            {
              type: "lines",
              coordinateSystem: "GLMap",
              zlevel: 2,
              effect: {
                show: true,
                // period: 10,
                // trailLength: 0,
                // symbol: planePath,
                symbolSize: 2,
                constantSpeed: 20, // 点移动的速度
                color: "#fff",
              },
              lineStyle: {
                normal: {
                  color: "#fe0101",
                  width: 3,
                  opacity: 0.6,
                  curveness: 0.2,
                },
              },
              data: data4,
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
    removeLayers(window.MAP, ["BigBay3"]);
    echartslayer.remove();
    window.MAP.setCenter([113.35, 22.9]);
  },
};
</script>

<style lang="scss" scoped>
</style>