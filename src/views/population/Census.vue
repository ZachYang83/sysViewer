<template>
  <div>
    <div class="census">
      人口普查：<el-select
        placeholder="六普"
        v-model="pic_value"
        @change="changeMode"
      >
        <el-option
          v-for="item in picOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <Legend
      v-show="showLegend"
      :title="legendTitle"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
  </div>
</template>

<script>
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      legendTitle: "总人口",
      showLegend: false,
      picOptions: [
        {
          value: "6census",
          label: "六普",
        },
        {
          value: "5census",
          label: "五普",
        },
      ],
      items: [
        {
          index: 1,
          text: "1~2700",
          style: "backgroundColor:rgba(69,117,181,1)",
        },
        {
          index: 2,
          text: "2701~5200",
          style: "backgroundColor:rgba(141,165,186,1)",
        },
        {
          index: 3,
          text: "5201~8400",
          style: "backgroundColor:rgba(217,224,191,1)",
        },
        {
          index: 4,
          text: "8401~13700",
          style: "backgroundColor:rgba(252,211,154,1)",
        },
        {
          index: 5,
          text: "13701~23500",
          style: "backgroundColor:rgba(240,129,89,1)",
        },
        {
          index: 6,
          text: "23501~52000",
          style: "backgroundColor:rgba(214,47,39,1)",
        },
      ],
      pic_value: "",
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.add_6census();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.35, 23.22], 8.5);
    },
    add_6census() {
      removeLayers(window.MAP, ["5p_pop", "6p_pop"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "renkou"], 2700],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "renkou"], 5200],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "renkou"], 8400],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "renkou"], 13700],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "renkou"], 23500],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "renkou"], 52000],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "6p_pop", "fill", paint);
      this.showLegend = true;
      this.items = [
        {
          index: 1,
          text: "1~2700",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "2701~5200",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "5201~8400",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "8401~13700",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "13701~23500",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "23501~52000",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    add_5census() {
      removeLayers(window.MAP, ["5p_pop", "6p_pop"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "renkou"], 24000],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "renkou"], 44000],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "renkou"], 67000],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "renkou"], 95000],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "renkou"], 134000],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "renkou"], 300000],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "5p_pop", "fill", paint);
      this.showLegend = true;
      this.items = [
        {
          index: 1,
          text: "1~4.4万",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "2.4万~4.4万",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "4.4万~6.7万",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "6.7万~9.5万",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "9.5万~13.4万",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "13.4万~30万",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    changeMode(val) {
      let _this = this;
      switch (val) {
        case "6census":
          _this.add_6census();
          break;
        case "5census":
          _this.add_5census();
          break;
      }
    },
  },
  destroyed() {
    removeLayers(window.MAP, [
      "5p_pop",
      "6p_pop",
    ]);
  },
};
</script>
<style lang="scss" scoped>
.census {
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