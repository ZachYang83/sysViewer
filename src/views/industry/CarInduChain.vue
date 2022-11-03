<template></template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_passengerData } from "api/population/passenger.js";
import Legend from "components/common/Legend.vue";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import { carData,erjiCar,fengtian } from "../population/data.js";
console.log(carData, "carData");
let echartslayer = null;

export default {
  data() {
    return {
      title: "图例",
      legentText: "flex:3",
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
  // components: {
  //   Legend,
  // },
  mounted() {
    this.init();
    // this.setTrack();
    this.initLayers();
    this.setCompany();
    
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(8);
    },
    initLayers() {
      var paint3 = {
        "line-color": "#ff6e40",
        "line-width": 3.5,
      };
      add_tms(window.MAP, "GuangFoLine", "line", paint3);
    },
    setCompany() {
      var data = carData[0];
      var od_data = [];
      var point_data = [];
      // var point_data = [[113.2637, 23.1341],[113.3062, 23.1208]];
      for (let i = 0; i < data.length; i++) {
        var split_data = data[i].split(",");
        var point1 =  [ Number(split_data[0]),Number(split_data[1])];
        var point2 =  [ Number(split_data[2]),Number(split_data[3])];
        var od = [
          { coord: [split_data[0], split_data[1]] },
          { coord: [split_data[2], split_data[3]] },
        ];
        od_data.push(od);
        point_data.push(point1);
        point_data.push(point2);
      }
      console.log(od_data, "od_data");
      var erjiData = []
      for(let j = 0 ; j < erjiCar.length ; j++){
        var od = [
          {coord:[erjiCar[j][0],erjiCar[j][1]]},
          {coord:[erjiCar[j][2],erjiCar[j][3]]},
        ]

        erjiData.push(od)
      }

      var ftData = []
      for(let j = 0 ; j < fengtian.length ; j++){
        var od = [
          {coord:[fengtian[j][0],fengtian[j][1]]},
          {coord:[fengtian[j][2],fengtian[j][3]]},
        ]

        ftData.push(od)
      }

      var option = {
        GLMap: {
          roam: false,
        },
        coordinateSystem: "GLMap",
        series: [
          {
            type: "scatter",
            coordinateSystem: "GLMap",
            data: point_data,
            symbolSize: 3,
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
                color: "#df2030",
              },
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
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
              constantSpeed: 15, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#bcec79",
                width: 0.1,
                opacity: 0.2,
                curveness: 0,
              },
            },
            data: od_data,
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
              constantSpeed: 15, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#4dd9e5",
                width: 3,
                opacity: 0.2,
                curveness: 0,
              },
            },
            data: erjiData,
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
              constantSpeed: 15, // 点移动的速度
            },
            lineStyle: {
              normal: {
                color: "#4dd9e5",
                width: 4,
                opacity: 0.2,
                curveness: 0,
              },
            },
            data: ftData,
          },
        ],
      };
      echartslayer = new EchartsLayer(window.MAP);
      console.log(echartslayer, "echartslayer");
      echartslayer.chart.setOption(option);
    },
  },
  destroyed() {
    echartslayer.remove();
    window.MAP.setCenter([113.35, 22.9]);
    removeLayers(window.MAP, ["GuangFoLine"]);
  },
};
</script>

<style lang="scss" scoped>
</style>