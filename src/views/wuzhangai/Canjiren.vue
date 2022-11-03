<template>
  <Legend
    :title='title'
    :items='items'
    style="bottom: 20px; left: 10px; width: 200px; height:auto"
  >
  </Legend>
</template>

<script>
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      title:'密度',
      items: [
        {
          index: 1,
          text: "差",
          style:'backgroundColor:rgba(255,224,224,0.8)',
        },
        {
          index: 2,
          text: "较差",
          style:'backgroundColor:rgba(235,165,155,0.8)',
        },
        {
          index: 3,
          text: "中等",
          style:'backgroundColor:rgba(207,112,95,0.8)',
        },
        {
          index: 4,
          text: "较高",
          style:'backgroundColor:rgba(176,65,48,0.8)',
        },
        {
          index: 5,
          text: "高",
          style:'backgroundColor:rgba(143,10,10,0.8)',
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
      if (window.MAP.getSource("canjiren2")) {
        window.MAP.removeSource("canjiren2");
      }
      window.MAP.addSource("canjiren2", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http:/8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Acanjiren2@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        // maxzoom: 8,
      });
      window.MAP.addLayer({
        id: "wuzhangai_layer",
        source: "canjiren2",
        "source-layer": "canjiren2",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "canjiren"], 0.000001],
            "rgba(255,224,224,0.8)", //<10.8
            ["<", ["get", "canjiren"], 0.000003],
            "rgba(235,165,155,0.8)", //>=10.8 & <17.2
            ["<", ["get", "canjiren"], 0.000009],
            "rgba(207,112,95,0.8)",
            ["<", ["get", "canjiren"], 0.000051],
            "rgba(176,65,48,0.8)",
            ["<", ["get", "canjiren"], 0.000821],
            "rgba(143,10,10,0.8)",
            "rgba(143,10,10,0.8)", // 默认值, >=50.1
          ],
        },
      });
    },
  },

  destroyed() {
    if (window.MAP.getLayer("wuzhangai_layer")) {
      window.MAP.removeLayer("wuzhangai_layer");
    }
    if (window.MAP.getSource("canjiren2")) {
      window.MAP.removeSource("canjiren2");
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