<template>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
</template>

<script>
import Legend from "components/common/Legend.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
export default {
  data() {
    return {
      title: "灯光增量",
      items: [
        {
          index: 1,
          text: "0 - 3",
          style: "backgroundColor:rgb(255,247,242)",
        },
        {
          index: 2,
          text: "3 - 5",
          style: "backgroundColor:rgb(252,206,202)",
        },
        {
          index: 3,
          text: "5 - 10",
          style: "backgroundColor:rgb(250,150,178)",
        },
        {
          index: 4,
          text: "10 - 20",
          style: "backgroundColor:rgb(227,64,153)",
        },
        {
          index: 5,
          text: "20 - 30",
          style: "backgroundColor:rgb(153,0,122)",
        },
        {
          index: 6,
          text: "30以上",
          style: "backgroundColor:rgb(73,0,107)",
        },
      ],
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.loadWMS();
  },
  methods: {
    init() {
      window.MAP.getCanvas().style.cursor = "pointer";
      init_map(window.MAP, [113.35, 22.9], 6.5);
    },
    loadWMS() {
      //   var paint = {
      //     "fill-outline-color": "#455a64",
      //     "fill-color": [
      //       "case",
      //       ["<", ["get", "2020_1995"], 3],
      //       "rgb(255,247,242)", //<10.8
      //       ["<", ["get", "2020_1995"], 5],
      //       "rgb(252,206,202)", //>=10.8 & <17.2
      //       ["<", ["get", "2020_1995"], 10],
      //       "rgb(250,150,178)",
      //       ["<", ["get", "2020_1995"], 20],
      //       "rgb(227,64,153)",
      //       ["<", ["get", "2020_1995"], 30],
      //       "rgb(153,0,122)",
      //       "rgb(73,0,107)", // 默认值, >=50.1
      //     ],
      //   };
      //   add_tms(window.MAP, "DMSP1995to2020", "fill", paint);

      window.MAP.addSource("DMSP1995to2020", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3ADMSP1995to2020@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "DMSP1995to2020",
        source: "DMSP1995to2020",
        "source-layer": "DMSP1995to2020",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "2020_1995"], 3],
            "rgb(255,247,242)", //<10.8
            ["<", ["get", "2020_1995"], 5],
            "rgb(252,206,202)", //>=10.8 & <17.2
            ["<", ["get", "2020_1995"], 10],
            "rgb(250,150,178)",
            ["<", ["get", "2020_1995"], 20],
            "rgb(227,64,153)",
            ["<", ["get", "2020_1995"], 30],
            "rgb(153,0,122)",
            "rgb(73,0,107)", // 默认值, >=50.1
          ],
        },
      });
      window.MAP.addLayer({
        id: "DMSP1995to2020_sym",
        source: "DMSP1995to2020",
        "source-layer": "DMSP1995to2020",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{区县}\n{2020_1995}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["DMSP1995to2020_sym", "DMSP1995to2020"]);
  },
};
</script>

<style lang='scss' scoped>
.legend {
  width: 100%;
  height: calc(100% - 40px);
  z-index: 999;

  .legend_item {
    width: 95%;
    height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .color {
    float: left;
    width: 25%;
    height: 100%;
    margin: 0px 10px;
    box-sizing: border-box;
  }

  .text {
    float: left;
    width: 55%;
    height: 100%;
    line-height: 30px;

    box-sizing: border-box;
    text-align: center;
    color: aliceblue;
  }

}
</style>