<template>
  <Legend
    :title="title"
    :items="items"
    style="bottom: 40px; left: 10px; width: 200px; height: auto"
  >
  </Legend>
</template>

<script>
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      title: "图例",
      items: [
        {
          index: 1,
          text: "儿童友好建设区",
          style: "backgroundColor:rgba(255,255,0,0.8)",
        },
        {
          index: 2,
          text: "城乡融合发展区",
          style: "backgroundColor:rgba(40,146,199,0.8)",
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
      window.MAP.setCenter([113.35, 23.22]);
      window.MAP.setZoom(8.5);
    },
    loadWMS() {
      if (window.MAP.getLayer("wuzhangai_layer")) {
        window.MAP.removeLayer("wuzhangai_layer");
      }
      if (window.MAP.getSource("children")) {
        window.MAP.removeSource("children");
      }
      if (window.MAP.getLayer("city_county_layer")) {
        window.MAP.removeLayer("city_county_layer");
      }
      if (window.MAP.getSource("city_county")) {
        window.MAP.removeSource("city_county");
      }
      if (window.MAP.getLayer("gz_line_layer")) {
        window.MAP.removeLayer("gz_line_layer");
      }
      if (window.MAP.getSource("gz_line")) {
        window.MAP.removeSource("gz_line");
      }
      window.MAP.addSource("children", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:/8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Achildren@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        // maxzoom: 8,
      });
      window.MAP.addLayer({
        id: "wuzhangai_layer",
        source: "children",
        "source-layer": "children",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": "rgba(255,255,0,0.8)",
        },
      });
      window.MAP.addSource("city_county", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:/8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Acity_county@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        // maxzoom: 8,
      });
      window.MAP.addLayer({
        id: "city_county_layer",
        source: "city_county",
        "source-layer": "city_county",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": "rgba(40,146,199,0.8)",
        },
      });
      window.MAP.addSource("gz_line", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:/8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Agz_line@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        // maxzoom: 8,
      });
      window.MAP.addLayer({
        id: "gz_line_layer",
        source: "gz_line",
        "source-layer": "gz_line",
        type: "line",
        paint: {
          "line-color": "#9e9e9e",
          "line-width": 1.1,
        },
      });
    },
  },

  destroyed() {
    if (window.MAP.getLayer("wuzhangai_layer")) {
      window.MAP.removeLayer("wuzhangai_layer");
    }
    if (window.MAP.getSource("children")) {
      window.MAP.removeSource("children");
    }
    if (window.MAP.getLayer("city_county_layer")) {
      window.MAP.removeLayer("city_county_layer");
    }
    if (window.MAP.getSource("city_county")) {
      window.MAP.removeSource("city_county");
    }
    if (window.MAP.getLayer("gz_line_layer")) {
      window.MAP.removeLayer("gz_line_layer");
    }
    if (window.MAP.getSource("gz_line")) {
      window.MAP.removeSource("gz_line");
    }
  },
};
</script>

<style lang='scss' scoped>
.legend {
  width: 100%;
  height: calc(100% - 40px);
  z-index: 999;

  .legend_item {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .color {
    // display: inline-block;
    float: left;
    width: 25%;
    height: 100%;
    margin: 0px 10px;
    box-sizing: border-box;
  }

  .text {
    // display: inline-block;

    float: left;
    width: 60%;
    height: 100%;
    line-height: 30px;
    // padding:5px 0;

    box-sizing: border-box;
    // background-color: aqua;
    text-align: center;
    color: aliceblue;
  }
}
</style>