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
      if(window.MAP.getLayer("lu2005")){
        window.MAP.removeLayer("lu2005")
      }
      if(window.MAP.getSource("lu2005_source")){
        window.MAP.removeSource("lu2005_source")
      }
      window.MAP.addSource("lu2005_source", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:ls2005&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
        // tileSize: 256,
      });
      window.MAP.addLayer({
        id: "lu2005",
        type: "raster",
        source: "lu2005_source",
        paint: {
          "raster-opacity": 1,
        },
      });
    },
  },

  destroyed(){
      window.MAP.removeLayer("lu2005");
      window.MAP.removeSource("lu2005_source")
  },
};
</script>

<style>
</style>