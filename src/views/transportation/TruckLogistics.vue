<template>
  <div>
    <!-- <data-bar title="统计数据" style="top:10px;right:60px;width:356px;height:500px"></data-bar>
    <Legend title="图例" style="bottom:10px;left:110px;width:200px;height:300px"></Legend> -->
  </div>
</template>

<script>
import DataBar from "components/common/DataBar_R.vue";
import Legend from "components/common/Legend.vue";
export default {
  components:{
    DataBar,
    Legend,
  },
  mounted() {
    this.init();
    this.loadWMS();
  },
  methods: {
     init() {
      window.MAP.getCanvas().style.cursor = "pointer";
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(6.5);
      window.MAP.setPitch(0);
      
    },
    loadWMS() {
      console.log('hhhhhhh');
      if(window.MAP.getLayer("huoche_O")){
        window.MAP.removeLayer("huoche_O")
      }
      if(window.MAP.getSource("huoche_o_source")){
        window.MAP.removeSource("huoche_o_source")
      }
      window.MAP.addSource("huoche_o_source", {
        type: "raster",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:HC_O4&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}",
        ],
        // tileSize: 256,
      });
      window.MAP.addLayer({
        id: "huoche_O",
        type: "raster",
        source: "huoche_o_source",
        paint: {
          // "background-color": "rgba(255,255,255,0)"
          "raster-opacity": 0.3,
        },
      });
    },
  },

  destroyed(){
      window.MAP.removeLayer("huoche_O");
      window.MAP.removeSource("huoche_o_source")
  },
};
</script>

<style>
</style>