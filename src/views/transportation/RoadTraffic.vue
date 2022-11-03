<template>
  <div>
    <div class="timeMode">
      选择车型：<el-select
        v-model="value"
        placeholder="乘用车"
        @change="changeMode"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <Legend
      v-show="showLegend"
      :title="title"
      :items="items"
      style="bottom: 20px; left: 110px; width: 200px; height: auto"
    >
    </Legend>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import { init_map } from "utils/initMap.js";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
export default {
  data() {
    return {
      options: [
        {
          value: "car",
          label: "乘用车",
        },
        {
          value: "truck",
          label: "重载货车",
        },
      ],
      title: "交通流量",
      items: [
        {
          index: 1,
          text: "500以下",
          style: "backgroundColor:rgba(0,0,255,0.6)",
        },
        {
          index: 2,
          text: "500 ~ 1800",
          style: "backgroundColor:rgba(51,194,255,0.6)",
        },
        {
          index: 3,
          text: "1800 ~ 4200",
          style: "backgroundColor:rgba(182,255,143,0.6)",
        },
        {
          index: 4,
          text: "4200 ~ 7800",
          style: "backgroundColor:rgba(255,200,0,0.6)",
        },
        {
          index: 5,
          text: "7800 ~ 17000",
          style: "backgroundColor:rgba(255,0,0,0.6)",
        },
      ],
      value: "",
      mode: null,
      showLegend: false,
    };
  },
  components: {
    Legend,
  },
  mounted() {
    init_map(window.MAP, [113.35, 22.9], 6.5);
    var paint = {
      "line-color": [
        "case",
        ["<", ["get", "Zday"], 500],
        "#0000FF", //<10.8
        ["<", ["get", "Zday"], 1800],
        "#33C2FF", //>=10.8 & <17.2
        ["<", ["get", "Zday"], 4200],
        "#B6FF8F",
        ["<", ["get", "Zday"], 7800],
        "#FFC800",
        ["<=", ["get", "Zday"], 17000],
        "#FF0000",
        "#FFFDBE",
      ],
      "line-width": [
        "case",
        ["<", ["get", "Zday"], 500],
        1, //<10.8
        ["<", ["get", "Zday"], 1800],
        2, //>=10.8 & <17.2
        ["<", ["get", "Zday"], 4200],
        3,
        ["<", ["get", "Zday"], 7800],
        4,
        ["<=", ["get", "Zday"], 17000],
        5,
        6,
      ],
      // "line-gap-width": 0.1,
      "line-opacity": 0.8,
    };
    add_tms(window.MAP, "cars_flow", "line", paint);
    var paint = {
        "line-color": "#df20df",
        "line-width": 3,
      };
      add_tms(window.MAP, "gzdadushi", "line", paint);
  },
  methods: {
    addCarLayer() {
      removeLayers(window.MAP, ["cars_flow"]);
      var paint = {
        "line-color": [
          "case",
          ["<", ["get", "Cday"], 500],
          "#0000FF", //<10.8
          ["<", ["get", "Cday"], 1800],
          "#33C2FF", //>=10.8 & <17.2
          ["<", ["get", "Cday"], 4200],
          "#B6FF8F",
          ["<", ["get", "Cday"], 7800],
          "#FFC800",
          ["<=", ["get", "Cday"], 17000],
          "#FF0000",
          "#FFFDBE",
        ],
        "line-width": [
          "case",
          ["<", ["get", "Cday"], 500],
          1, //<10.8
          ["<", ["get", "Cday"], 1800],
          2, //>=10.8 & <17.2
          ["<", ["get", "Cday"], 4200],
          3,
          ["<", ["get", "Cday"], 7800],
          4,
          ["<=", ["get", "Cday"], 17000],
          5,
          6,
        ],
        // "line-gap-width": 0.1,
        "line-opacity": 0.8,
      };
      add_tms(window.MAP,"cars_flow","line",paint);
    },
    addTruckLayer() {
      removeLayers(window.MAP, ["cars_flow"]);
      var paint = {
        "line-color": [
          "case",
          ["<", ["get", "Zday"], 500],
          "#0000FF", //<10.8
          ["<", ["get", "Zday"], 1800],
          "#33C2FF", //>=10.8 & <17.2
          ["<", ["get", "Zday"], 4200],
          "#B6FF8F",
          ["<", ["get", "Zday"], 7800],
          "#FFC800",
          ["<=", ["get", "Zday"], 17000],
          "#FF0000",
          "#FFFDBE",
        ],
        "line-width": [
          "case",
          ["<", ["get", "Zday"], 500],
          1, //<10.8
          ["<", ["get", "Zday"], 1800],
          2, //>=10.8 & <17.2
          ["<", ["get", "Zday"], 4200],
          3,
          ["<", ["get", "Zday"], 7800],
          4,
          ["<=", ["get", "Zday"], 17000],
          5,
          6,
        ],
        // "line-gap-width": 0.1,
        "line-opacity": 0.8,
      };
      add_tms(window.MAP,"cars_flow","line",paint);
    },
    changeMode(val) {
      this.mode = val;
      console.log(this.mode, "mode");
      if(val == 'car'){
          this.addCarLayer();
      }else{
          this.addTruckLayer();
      }
    },
  },
  destroyed() {
      removeLayers(window.MAP, ["cars_flow",'gzdadushi']);
  },
};
</script>
    
<style lang='scss' scoped>
.timeMode {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 50px;
  width: 200px;
  color: aliceblue;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-select {
  width: 110px;
}
</style>