<template>
  <div>
    <Legend
      v-show="showLegend"
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
  </div>
</template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_passengerData } from "api/population/passenger.js";
import Legend from "components/common/Legend.vue";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import { yiji, erji, sanji, siji } from "./gzhyod.js";
let echartslayer = null;

export default {
  data() {
    return {
      showLegend: true,
      title: "图例",
      legentText: "flex:3",
      items: [
        {
          index: 1,
          text: "5百以下",
          style: "backgroundColor:rgba(70,145,155,0.8)",
        },
        {
          index: 2,
          text: "5百 - 2千",
          style: "backgroundColor:rgba(138,203,80,0.8)",
        },
        {
          index: 3,
          text: "2千 - 1万",
          style: "backgroundColor:rgba(204,120,14,0.8)",
        },
        {
          index: 4,
          text: "1万 - 3万",
          style: "backgroundColor:rgba(192,58,53,0.8)",
        },
      ],
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    // this.setTrack();
    this.initLayers();
    this.setCompany();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.216937, 24.494172]);
      window.MAP.setZoom(6);
    },
    initLayers() {
      var gdxzbj = {
        "line-color": "#bdbdbd",
        "line-width": 1,
      };
      add_tms(window.MAP, "gdxzbj", "line", gdxzbj);
      var paint3 = {
        "line-color": "#df20df",
        "line-width": 3.5,
      };
      // add_tms(window.MAP, "gzdadushi", "line", paint3);
    },
    setCompany() {
      var yiji_data = [];
      var points = [];
      points.push([113.538002, 23.3369007]);
      for (let i = 0; i < yiji.length; i++) {
        var item = yiji[i];
        var point2 = [Number(item[0]), Number(item[1])];
        var od = [
          { coord: [113.538002, 23.3369007] },
          { coord: [item[0], item[1]] },
        ];
        yiji_data.push(od);
        points.push(point2);
      }
      var erji_data = [];
      for (let i = 0; i < erji.length; i++) {
        var item = erji[i];
        var point2 = [Number(item[0]), Number(item[1])];
        var od = [
          { coord: [113.538002, 23.3369007] },
          { coord: [item[0], item[1]] },
        ];
        erji_data.push(od);
        points.push(point2);
      }
      var sanji_data = [];
      for (let i = 0; i < sanji.length; i++) {
        var item = sanji[i];
        var point2 = [Number(item[0]), Number(item[1])];
        var od = [
          { coord: [113.538002, 23.3369007] },
          { coord: [item[0], item[1]] },
        ];
        sanji_data.push(od);
        points.push(point2);
      }
      var siji_data = [];
      for (let i = 0; i < siji.length; i++) {
        var item = siji[i];
        var point2 = [Number(item[0]), Number(item[1])];
        var od = [
          { coord: [113.538002, 23.3369007] },
          { coord: [item[0], item[1]] },
        ];
        siji_data.push(od);
        points.push(point2);
      }
      console.log(points, "fdasfadsf");
      var option = {
        GLMap: {
          roam: false,
        },
        coordinateSystem: "GLMap",
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "GLMap",
            data: points,
            symbolSize: 4,
            large: true,
            // itemStyle: {
            //   normal: {
            //     color: "#ffff00",
            //   },
            //   emphasis: {
            //     borderColor: "#fff",
            //     borderWidth: 1,
            //   },
            // },
            rippleEffect: {
              brushType: "fill",
            },
            itemStyle: {
              normal: {
                color: "#F4E925",
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
          },
          {
            type: "lines",
            coordinateSystem: "GLMap",
            zlevel: 2,
            effect: {
              show: false,
              // period: 10,
              // trailLength: 0,
              color: "#fff",
              opacity: 0.5,
              // symbol: planePath,
              symbolSize: 5,
              constantSpeed: 7, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#ff9100",
                width: 5,
                opacity: 0.5,
                curveness: 0.1,
              },
            },
            data: erji_data,
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
              opacity: 0.5,
              // symbol: planePath,
              symbolSize: 3,
              constantSpeed: 20, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#b2ff59",
                width: 3,
                opacity: 0.2,
                curveness: 0.1,
              },
            },
            data: sanji_data,
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
              opacity: 0.5,
              // symbol: planePath,
              symbolSize: 2,
              constantSpeed: 30, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#84ffff",
                width: 1,
                opacity: 0.1,
                curveness: 0.1,
              },
            },
            data: siji_data,
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
              opacity: 0.5,
              // symbol: planePath,
              symbolSize: 7,
              constantSpeed: 5, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#f44336",
                width: 12,
                opacity: 0.2,
                curveness: 0.1,
              },
            },
            data: yiji_data,
          },
        ],
      };
      echartslayer = new EchartsLayer(window.MAP);
      console.log(echartslayer, "echartslayer");
      echartslayer.chart.setOption(option);
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
          if (popOd_data[i].olon2 != 0 && popOd_data[i].dlon4 != 0) {
            var od3 = [
              { coord: [popOd_data[i].olon2, popOd_data[i].olat2] },
              { coord: [popOd_data[i].dlon4, popOd_data[i].dlat4] },
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
                symbolSize: 0.2,
                constantSpeed: 5, // 点移动的速度
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
                symbolSize: 0.4,
                constantSpeed: 5, // 点移动的速度
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
                constantSpeed: 20, // 点移动的速度
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
        this.showLegend = true;
        echartslayer = new EchartsLayer(window.MAP);
        console.log(echartslayer, "echartslayer");
        echartslayer.chart.setOption(option);
      });
    },
  },
  destroyed() {
    echartslayer.remove();
    window.MAP.setCenter([113.35, 22.9]);
    removeLayers(window.MAP, ["gzdadushi", "gdxzbj"]);
  },
};
</script>

<style lang="scss" scoped>
</style>