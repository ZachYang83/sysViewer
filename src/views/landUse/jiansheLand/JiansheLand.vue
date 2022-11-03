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
      title: "建设用地",
      items: [
        {
          index: 1,
          text: "城镇用地",
          style: "backgroundColor:#ffee58",
        },
        {
          index: 2,
          text: "农村居民点",
          style: "backgroundColor:#b2ff59",
        },
        {
          index: 3,
          text: "其他建设用地",
          style: "backgroundColor:#c9769b",
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
      window.MAP.addSource("jiansheLand", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:1995_jsyd&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
        // tileSize: 256,
      });
      window.MAP.addLayer({
        id: "jiansheLand",
        type: "raster",
        source: "jiansheLand",
        paint: {
            "raster-opacity": 1,
          },
        },
      );
    },
    changeLayer(index) {
      var year ;
      console.log(index,'index');
      switch(index){
        case 0:
          year = 1995;
          break;
        case 1:
          year = 2000;
          break;
        case 2:
          year = 2005;
          break;
        case 3:
          year = 2010;
          break;
        case 4:
          year = 2015;
          break;
        case 5:
          year = 2020;
          break;
      }
      window.MAP.removeLayer('jiansheLand');
      window.MAP.removeSource('jiansheLand');
      window.MAP.addSource("jiansheLand", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:"+ year +"_jsyd&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
      });
      window.MAP.addLayer({
        id: "jiansheLand",
        type: "raster",
        source: "jiansheLand",
        paint: {
            "raster-opacity": 1,
          },
        },
      );
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["jiansheLand"]);
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