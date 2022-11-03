<template>
  <Legend
    :title="title"
    :items="items"
    :legentText='legentText'
    style="bottom: 40px; left: 10px; width: 200px; height: auto"
  >
  </Legend>
</template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_passengerData } from "api/population/passenger.js";
import Legend from "components/common/Legend.vue";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
let echartslayer = null;

export default {
  data() {
    return {
      title: "图例",
      legentText:'flex:3',
      items: [
        {
          index: 1,
          text: "54776 ~ 467318",
          style: "backgroundColor:rgba(0,191,255,0.8)",
        },
        {
          index: 2,
          text: "7136 ~ 54776",
          style: "backgroundColor:rgba(100,149,237,0.8)",
        },
        {
          index: 3,
          text: "1635 ~ 7136",
          style: "backgroundColor:rgba(65,105,225,0.8)",
        },
        {
          index: 4,
          text: "1000 ~ 1635",
          style: "backgroundColor:rgba(0,0,128,0.8)",
        },
      ],
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.setTrack();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(6.5);
      var paint1 = {
        "line-color": "#df20df",
        "line-width": 2.5,
        "line-opacity": 0.3,
      };
      add_tms(window.MAP, "zsjline", "line", paint1);
      var paint2 = {
        "fill-outline-color": "#9e9e9e",
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#616161",
          "#616161",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.6,
        ],
      };
      add_tms(window.MAP, "fzsj", "fill", paint2);
    },
    setTrack() {
      get_passengerData("/tra_monitor/od1000/all").then((res) => {
        var popOd_data = res.data.data;
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];
        for (let i = 0; i < popOd_data.length; i++) {
          if (popOd_data[i].olon1 != 0 && popOd_data[i].olon3 != 0) {
            var od1 = [
              { coord: [popOd_data[i].olon1, popOd_data[i].olat1] },
              { coord: [popOd_data[i].olon3, popOd_data[i].olat3] },
            ];
            data1.push(od1);
          }
          if (popOd_data[i].dlon1 != 0 && popOd_data[i].dlon3 != 0) {
            var od2 = [
              { coord: [popOd_data[i].dlon1, popOd_data[i].dlat1] },
              { coord: [popOd_data[i].dlon3, popOd_data[i].dlat3] },
            ];
            data2.push(od2);
          }
          if (popOd_data[i].olon2 != 0 && popOd_data[i].olon4 != 0) {
            var od3 = [
              { coord: [popOd_data[i].olon2, popOd_data[i].olat2] },
              { coord: [popOd_data[i].olon4, popOd_data[i].olat4] },
            ];
            data3.push(od3);
          }
          if (popOd_data[i].dlon2 != 0 && popOd_data[i].dlon4 != 0) {
            var od4 = [
              { coord: [popOd_data[i].dlon2, popOd_data[i].dlat2] },
              { coord: [popOd_data[i].dlon4, popOd_data[i].dlat4] },
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
              effect: {
                show: true,
                // period: 10,
                // trailLength: 0,
                color: "#fff",
                // symbol: planePath,
                symbolSize: 1,
                constantSpeed: 30, // 点移动的速度
              },
              lineStyle: {
                normal: {
                  color: "#000080",
                  width: 0.1,
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
                symbolSize: 2,
                constantSpeed: 20, // 点移动的速度
              },
              lineStyle: {
                normal: {
                  color: "#4169E1",
                  width: 0.5,
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
                symbolSize: 3,
                constantSpeed: 15, // 点移动的速度
                color: "#fff",
              },
              lineStyle: {
                normal: {
                  color: "#6495ED",
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
                constantSpeed: 10, // 点移动的速度
                color: "#fff",
              },
              lineStyle: {
                normal: {
                  color: "#00BFFF",
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
    echartslayer.remove();
    window.MAP.setCenter([113.35, 22.9]);
     removeLayers(window.MAP, [
      "zsjline",
      "fzsj",
    ]);
  },
};
</script>

<style lang="scss" scoped>
</style>