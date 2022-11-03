<template></template>

<script>
export default {
  mounted() {
    this.init();
    this.loadWMS();
  },
  methods: {
    init(){
      window.MAP.setCenter([113.35, 23.1]);
      window.MAP.setZoom(8);
    },
    loadWMS() {
      if (window.MAP.getLayer("gz_roads")) {
        window.MAP.removeLayer("gz_roads");
      }
      if (window.MAP.getSource("gz_roads_source")) {
        window.MAP.removeSource("gz_roads_source");
      }
      window.MAP.addSource("gz_roads_source", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Agz_roads4@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        maxzoom: 22,
      });
      window.MAP.addLayer({
        id: "gz_roads",
        source: "gz_roads_source",
        "source-layer": "gz_roads4",
        type: "line",
        paint: {
          "line-color": [
            "match",
            ["get", "road_rank"],
            1,
            "#bdbdbd",
            2,
            "#b2ff59",
            3,
            "#ff9800",
            4,
            "#1e88e5",
            5,
            "#d32f2f",
            "#A880FF",
          ],
          "line-width": [
            "match",
            ["get", "road_rank"],
            1,
            0.5,
            2,
            1,
            3,
            1.5,
            4,
            3,
            5,
            4,
            0.1,
          ],
        },
      });
    },
  },

  destroyed() {
    window.MAP.removeLayer("gz_roads");
    window.MAP.removeSource("gz_roads_source");
  },
};
</script>

<style>
</style>