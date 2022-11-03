<template>
  <div id="panel-map">

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
        console.log('hafkajsfjkd');
      mapboxgl.accessToken =
        "pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";

      window.PANEL_MAP = new mapboxgl.Map({
        container: "panel-map",
        style: {
          version: 8,
          sources: {
            mapsource: {
              type: "raster",
              tiles: [
                "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "mapsource",
              type: "raster",
              source: "mapsource",
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
        center: [113.332208, 23.122544],
        attributionControl: false,
        zoom: 11.5,
        antialias: false,
      });
    },
  },
}
</script>

<style lang="scss">
#panel-map {
  width: 100%;
  height: 100%;
}

.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>