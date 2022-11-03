<template>
  <div>
    <div class="pop_picture">
      人口画像：<el-select
        placeholder="省内就业"
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
      legendTitle: "省内就业占比",
      showLegend: false,
      picOptions: [
        {
          value: "jiuye_gd",
          label: "省内就业",
        },
        {
          value: "shengyuan_gd",
          label: "省内生源",
        },
        {
          value: "jiuye_china",
          label: "国内就业",
        },
        {
          value: "shengyuan_china",
          label: "国内生源",
        },
      ],
      items: [
        {
          index: 1,
          text: "0.3% - 1%",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "1.1% - 2%",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "2.1% - 4%",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "4.1% - 7%",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "71% - 13.5%",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "13.6% - 43%",
          style: "backgroundColor:rgba(214,47,39,0.7)",
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
    this.add_jiuyeLayers();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.35, 22.9], 6.5);
    },
    add_jiuyeLayers() {
        init_map(window.MAP, [113.35, 22.9], 6.5);
      removeLayers(window.MAP, ["stu_picture", "jiuye_symbol","stu_picture2", "jiuye_symbol2"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "jiuye"], 0.01],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "jiuye"], 0.02],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "jiuye"], 0.04],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "jiuye"], 0.07],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "jiuye"], 0.13],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "jiuye"], 0.43],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "stu_picture", "fill", paint);
      var paint2 = {
        "text-color": "#ffffff",
      };
      var layout = {
        "text-field": ["get", "employment"],
        "text-size": 18,
      };
      window.MAP.addSource("jiuye_symbol", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Astu_picture_sym@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        tileSize: 512,
      });
      window.MAP.addLayer({
        id: "jiuye_symbol",
        type: "symbol",
        source: "jiuye_symbol",
        "source-layer": "stu_picture_sym",
        paint: paint2,
        layout: layout,
      });
      this.showLegend = true;
      this.legendTitle = "省内就业占比";
      this.items=[
        {
          index: 1,
          text: "0.3% - 1%",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "1.1% - 2%",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "2.1% - 4%",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "4.1% - 7%",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "71% - 13.5%",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "13.6% - 43%",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    add_shengyuanLayers() {
        init_map(window.MAP, [113.35, 22.9], 6.5);
     removeLayers(window.MAP, ["stu_picture", "jiuye_symbol","stu_picture2", "jiuye_symbol2"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "shengyuan"], 0.018],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "shengyuan"], 0.025],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "shengyuan"], 0.03],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "shengyuan"], 0.04],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "shengyuan"], 0.06],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "shengyuan"], 0.087],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "stu_picture", "fill", paint);
      var paint2 = {
        "text-color": "#ffffff",
      };
      var layout = {
        "text-field": ["get", "source"],
        "text-size": 18,
      };
      window.MAP.addSource("jiuye_symbol", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Astu_picture_sym@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        tileSize: 512,
      });
      window.MAP.addLayer({
        id: "jiuye_symbol",
        type: "symbol",
        source: "jiuye_symbol",
        "source-layer": "stu_picture_sym",
        paint: paint2,
        layout: layout,
      });
      this.legendTitle = "省内生源占比";
      this.items=[
        {
          index: 1,
          text: "0.3% - 1%",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "1.1% - 2%",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "2.1% - 4%",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "4.1% - 7%",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "71% - 13.5%",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "13.6% - 43%",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    add_jiuyeLayers2() {
        init_map(window.MAP, [104, 37], 3.5);
      removeLayers(window.MAP, ["stu_picture", "jiuye_symbol","stu_picture2", "jiuye_symbol2"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "jiuye"], 0.001],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "jiuye"], 0.003],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "jiuye"], 0.006],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "jiuye"], 0.010],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "jiuye"], 0.015],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "jiuye"], 0.084],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "stu_picture2", "fill", paint);
      var paint2 = {
        "text-color": "#ffffff",
      };
      var layout = {
        "text-field": ["get", "employment"],
        "text-size": 18,
      };
      window.MAP.addSource("jiuye_symbol2", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Astu_picture_sym2@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        tileSize: 512,
      });
      window.MAP.addLayer({
        id: "jiuye_symbol",
        type: "symbol",
        source: "jiuye_symbol2",
        "source-layer": "stu_picture_sym2",
        paint: paint2,
        layout: layout,
      });
      this.showLegend = true;
      this.legendTitle = "国内就业占比";
      this.items=[
        {
          index: 1,
          text: "0.06%-0.10%",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "0.11%-0.30%",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "0.31%-0.60%",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "0.61%-1.00%",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "1.01%-1.50%",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "1.51%-84.75%",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    add_shengyuanLayers2() {
        init_map(window.MAP, [104, 37], 3.5);
      removeLayers(window.MAP, ["stu_picture", "jiuye_symbol","stu_picture2", "jiuye_symbol2"]);
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "shengyuan"], 0.003],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "shengyuan"], 0.006],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "shengyuan"], 0.009],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "shengyuan"], 0.012],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "shengyuan"], 0.020],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "shengyuan"], 0.0717],
          "rgba(214,47,39,0.7)",
          "rgba(214,47,39,0.7)",
        ],
      };
      add_tms(window.MAP, "stu_picture2", "fill", paint);
      var paint2 = {
        "text-color": "#ffffff",
      };
      var layout = {
        "text-field": ["get", "source"],
        "text-size": 18,
      };
      window.MAP.addSource("jiuye_symbol2", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Astu_picture_sym2@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        tileSize: 512,
      });
      window.MAP.addLayer({
        id: "jiuye_symbol",
        type: "symbol",
        source: "jiuye_symbol2",
        "source-layer": "stu_picture_sym2",
        paint: paint2,
        layout: layout,
      });
      this.showLegend = true;
      this.legendTitle = "全国生源地占比";
      this.items=[
        {
          index: 1,
          text: "0.03% - 0.3%",
          style: "backgroundColor:rgba(69,117,181,0.7)",
        },
        {
          index: 2,
          text: "0.31% - 0.6%",
          style: "backgroundColor:rgba(141,165,186,0.7)",
        },
        {
          index: 3,
          text: "0.61% - 0.9%",
          style: "backgroundColor:rgba(217,224,191,0.7)",
        },
        {
          index: 4,
          text: "0.91% - 1.2%",
          style: "backgroundColor:rgba(252,211,154,0.7)",
        },
        {
          index: 5,
          text: "1.21% - 2%",
          style: "backgroundColor:rgba(240,129,89,0.7)",
        },
        {
          index: 6,
          text: "2.01% - 71.7%",
          style: "backgroundColor:rgba(214,47,39,0.7)",
        },
      ];
    },
    changeMode(val) {
      let _this = this;
      switch (val) {
        case "jiuye_gd":
          _this.add_jiuyeLayers();
          break;
        case "shengyuan_gd":
          _this.add_shengyuanLayers();
          break;
        case "jiuye_china":
          _this.add_jiuyeLayers2();
          break;
        case "shengyuan_china":
          _this.add_shengyuanLayers2();
          break;
      }
    },
  },
  destroyed(){
      removeLayers(window.MAP, ["stu_picture", "jiuye_symbol","stu_picture2", "jiuye_symbol2"]);
  }
};
</script>
<style lang="scss" scoped>
.pop_picture {
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