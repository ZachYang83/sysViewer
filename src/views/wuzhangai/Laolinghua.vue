<template>
  <Legend
    :title='title'
    :items='items'
    style="bottom: 20px; left: 10px; width: 200px; height: auto"
  >
  </Legend>
</template>

<script>
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      title:'老龄化率',
      items: [
        {
          index: 1,
          text: "0.012 ~ 0.040",
          style:'backgroundColor:rgba(220,245,233,0.8)',
        },
        {
          index: 2,
          text: "0.040 ~ 0.056",
          style:'backgroundColor:rgba(184,219,196,0.8)',
        },
        {
          index: 3,
          text: "0.056 ~ 0.073",
          style:'backgroundColor:rgba(149,194,162,0.8)',
        },
        {
          index: 4,
          text: "0.073 ~ 0.089",
          style:'backgroundColor:rgba(118,168,130,0.8)',
        },
        {
          index: 5,
          text: "0.089 ~ 0.122",
          style:'backgroundColor:rgba(87,145,101,0.8)',
        },
        {
          index: 6,
          text: "0.122 ~ 0.167",
          style:'backgroundColor:rgba(60,122,75,0.8)',
        },
        {
          index: 7,
          text: "0.167 ~ 0.200",
          style:'backgroundColor:rgba(34,102,51,0.8)',
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
            ["<", ["get", "laolinghua"], 0.03976],
            "rgba(220,245,233,0.8)", //<10.8
            ["<", ["get", "laolinghua"], 0.056061],
            "rgba(184,219,196,0.8)",
            ["<", ["get", "laolinghua"], 0.07321],
            "rgba(149,194,162,0.8)", //>=10.8 & <17.2
            ["<", ["get", "laolinghua"], 0.089013],
            "rgba(118,168,130,0.8)",
            ["<", ["get", "laolinghua"], 0.122371],
            "rgba(87,145,101,0.8)",
            ["<", ["get", "laolinghua"], 0.167775],
            "rgba(60,122,75,0.8)",
            ["<", ["get", "laolinghua"], 0.199973],
            "rgba(34,102,51,0.8)",
            "rgba(34,102,51,0.8)", // 默认值, >=50.1
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
.legend{
    width:100%;
    height: calc(100% - 40px);
    z-index: 999;

    .legend_item{
        width:95%;
        height:30px;
        margin-top:10px;
        box-sizing: border-box;
    }

    .color{
        // display: inline-block;
        float:left;
        width:25%;
        height:100%;
        margin:0px 10px;
        box-sizing: border-box;
    }

    .text{
        // display: inline-block;
        
        float:left;
        width:55%;
        height:100%;
        line-height: 30px;
        // padding:5px 0;
        
        box-sizing: border-box;
        // background-color: aqua;
        text-align: center;
        color: aliceblue;
    }
}

</style>