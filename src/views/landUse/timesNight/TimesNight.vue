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
      title: "平均夜光指数",
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
            ["<", ["get", "1995_mean"], 3],
            "rgb(255,247,242)", //<10.8
            ["<", ["get", "1995_mean"], 5],
            "rgb(252,206,202)", //>=10.8 & <17.2
            ["<", ["get", "1995_mean"], 10],
            "rgb(250,150,178)",
            ["<", ["get", "1995_mean"], 20],
            "rgb(227,64,153)",
            ["<", ["get", "1995_mean"], 30],
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
          "text-field": "{区县}\n{1995_mean}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
    },
    changeLayer(index) {
      var field ;
      var text;
      console.log(index,'index');
      switch(index){
        case 0:
          field = 1995 + "_mean";
          text = "{区县}\n{1995_mean}";
          break;
        case 1:
          field = 2000 + "_mean";
          text = "{区县}\n{2000_mean}";
          break;
        case 2:
          field = 2005 + "_mean";
          text = "{区县}\n{2005_mean}";
          break;
        case 3:
          field = 2010 + "_mean";
          text = "{区县}\n{2010_mean}";
          break;
        case 4:
          field = 2015 + "_mean";
          text = "{区县}\n{2015_mean}";
          break;
        case 5:
          field = 2020 + "_mean";
          text = "{区县}\n{2020_mean}";
          break;
      }
      var paintO = {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", field], 3],
            "rgb(255,247,242)", //<10.8
            ["<", ["get", field], 5],
            "rgb(252,206,202)", //>=10.8 & <17.2
            ["<", ["get", field], 10],
            "rgb(250,150,178)",
            ["<", ["get", field], 20],
            "rgb(227,64,153)",
            ["<", ["get", field], 30],
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
      window.MAP.removeLayer('DMSP1995to2020');
      window.MAP.addLayer({
        id: "DMSP1995to2020",
        source: "DMSP1995to2020",
        "source-layer": "DMSP1995to2020",
        type: "fill",
        paint: paintO,
      });
      window.MAP.removeLayer('DMSP1995to2020_sym');
      window.MAP.addLayer({
        id: "DMSP1995to2020_sym",
        source: "DMSP1995to2020",
        "source-layer": "DMSP1995to2020",
        type: "symbol",
        layout: layoutO,
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

.timeLine {
  position: absolute;
  bottom: 30px;
  width: 30%;
  right: 50%;
  transform: translateX(50%);
  height: 50px;
  z-index: 9999;
}
</style>