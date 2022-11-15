<template>
  <div>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
    <div class="timeLine">
      <Timeline @changeData="changeLayer"></Timeline>
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Timeline from "./Timeline.vue";
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
      title: "常住人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 25",
          style: "backgroundColor:rgb(255,247,242)",
        },
        {
          index: 2,
          text: "25 - 50",
          style: "backgroundColor:rgb(252,206,202)",
        },
        {
          index: 3,
          text: "50 - 100",
          style: "backgroundColor:rgb(250,150,178)",
        },
        {
          index: 4,
          text: "100 - 250",
          style: "backgroundColor:rgb(227,64,153)",
        },
        {
          index: 5,
          text: "250 - 500",
          style: "backgroundColor:rgb(153,0,122)",
        },
      ],
    };
  },
  components: {
    Legend,
    Timeline,
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
      window.MAP.addSource("changzhu", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Achangzhu@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "changzhu",
        source: "changzhu",
        "source-layer": "changzhu",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "1mon"], 25.0],
            "rgb(255,247,242)", 
            ["<", ["get", "1mon"], 50.0],
            "rgb(252,206,202)", 
            ["<", ["get", "1mon"], 100.0],
            "rgb(250,150,178)",
            ["<", ["get", "1mon"], 250.0],
            "rgb(227,64,153)",
            ["<", ["get", "1mon"], 500.0],
            "rgb(153,0,122)",
            "rgb(73,0,107)",
          ],
        },
      });
      window.MAP.addLayer({
        id: "changzhu_sym",
        source: "changzhu",
        "source-layer": "changzhu",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{county}\n{1mon}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
    },
    changeLayer(index) {
      var field;
      var text;
      console.log(index, "index");
      switch (index) {
        case 0:
          field = "1mon" ;
          text = "{county}\n{1mon}";
          break;
        case 1:
          field = "2mon";
          text = "{county}\n{2mon}";
          break;
        case 2:
          field = "3mon";
          text = "{county}\n{3mon}";
          break;
        case 3:
          field = "4mon";
          text = "{county}\n{4mon}";
          break;
        case 4:
          field = "5mon";
          text = "{county}\n{5mon}";
          break;
        case 5:
          field = "6mon";
          text = "{county}\n{6mon}";
          break;
        case 6:
          field = "7mon";
          text = "{county}\n{7mon}";
          break;
        case 7:
          field = "8mon";
          text = "{county}\n{8mon}";
          break;
        case 8:
          field = "9mon";
          text = "{county}\n{9mon}";
          break;
        case 9:
          field = "10mon";
          text = "{county}\n{10mon}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 25],
          "rgb(255,247,242)", //<10.8
          ["<", ["get", field], 50],
          "rgb(252,206,202)", //>=10.8 & <17.2
          ["<", ["get", field], 100],
          "rgb(250,150,178)",
          ["<", ["get", field], 250],
          "rgb(227,64,153)",
          ["<", ["get", field], 500],
          "rgb(153,0,122)",
          "rgb(73,0,107)", // 默认值, >=50.1
        ],
      };
      var layoutO = {
        "icon-image": "",
        "text-field": text, //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.removeLayer("changzhu");
      window.MAP.addLayer({
        id: "changzhu",
        source: "changzhu",
        "source-layer": "changzhu",
        type: "fill",
        paint: paintO,
      });
      window.MAP.removeLayer("changzhu_sym");
      window.MAP.addLayer({
        id: "changzhu_sym",
        source: "changzhu",
        "source-layer": "changzhu",
        type: "symbol",
        layout: layoutO,
      });
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["changzhu_sym", "changzhu"]);
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

.timeLine {
  position: absolute;
  bottom: 30px;
  width: 35%;
  right: 50%;
  transform: translateX(50%);
  height: 60px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 0px;
  border-radius: 40px;
}
</style>