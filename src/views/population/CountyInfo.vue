<template></template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";

let popup = null;
export default {
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
      popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
      });
    },
    loadWMS() {
      if (window.MAP.getLayer("county_pop_Layer")) {
        window.MAP.removeLayer("county_pop_Layer");
      }
      if (window.MAP.getSource("county_pop")) {
        window.MAP.removeSource("county_pop");
      }
      var county_pop = {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Agd_county_pop@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
        maxzoom: 14,
      };
      var county_pop_Layer = {
        id: "county_pop_Layer",
        source: "county_pop",
        "source-layer": "gd_county_pop",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "pop_sum"], 2000],
            "#4575B5", //<10.8
            ["<", ["get", "pop_sum"], 10000],
            "#AAD7F0", //>=10.8 & <17.2
            ["<", ["get", "pop_sum"], 50000],
            "#ffff8d",
            ["<", ["get", "pop_sum"], 200000],
            "#FA8D34",
            ["<", ["get", "pop_sum"], 17000000],
            "#E81014",
            "rgba(255, 0, 255, .9)", // 默认值, >=50.1
          ],
        },
      };
      window.MAP.addSource("county_pop", county_pop);
      window.MAP.addLayer(county_pop_Layer);
      window.MAP.on("click", function (e) {
        window.MAP.getCanvas().style.cursor = "pointer";
        var bbox = [
          [e.point.x - 1, e.point.y - 1],
          [e.point.x + 1, e.point.y + 1],
        ];
        // mapbox 返回查询要素的图层属性
        var features = window.MAP.queryRenderedFeatures(bbox, {
          layers: ["county_pop_Layer"],
        });
        var filter_hp = features.reduce(function (memo, feature) {
          console.log(feature, "feature");
          if (feature.sourceLayer == "gd_county_pop") {
            var name = feature.properties.ZLDWMC;
            var popsum = feature.properties.pop_sum;
            var text = name + ": " + popsum+"人";
            popup.setLngLat(e.lngLat).setHTML(text).addTo(window.MAP);
          }
        },["in", "ZLDWMC"]);
      });
      var paint = {
        "line-color": "#df20df",
        "line-width": 3,
      };
      // add_tms(window.MAP, "gzdadushi", "line", paint);
    },
  },

  destroyed() {
    if (window.MAP.getLayer("county_pop_Layer")) {
      window.MAP.removeLayer("county_pop_Layer");
    }
    if (window.MAP.getSource("county_pop")) {
      window.MAP.removeSource("county_pop");
    }
    removeLayers(window.MAP, ['gzdadushi']);
  },
};
</script>

<style>
</style>