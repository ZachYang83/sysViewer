<template>
</template>

<script>
export default {
  mounted() {
    this.init();
    this.loadWMS();
  },
  methods: {
    init(){
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(6.5);
    },
    loadWMS() {
      if(window.MAP.getLayer("lu1995")){
        window.MAP.removeLayer("lu1995")
      }
      if(window.MAP.getSource("lu1995_source")){
        window.MAP.removeSource("lu1995_source")
      }
      window.MAP.addSource("lu1995_source", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:ls1995&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
        // tileSize: 256,
      });
      window.MAP.addLayer({
        id: "lu1995",
        type: "raster",
        source: "lu1995_source",
        paint: {
            "raster-opacity": 1,
          },
        },
      );
    },
  },

  destroyed(){
      if(window.MAP.getLayer("lu1995")){
        window.MAP.removeLayer("lu1995")
      }
      if(window.MAP.getSource("lu1995_source")){
        window.MAP.removeSource("lu1995_source")
      }
  },
};
</script>

<style>
</style>