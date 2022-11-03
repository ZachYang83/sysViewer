<template>
  <div>
    <div class="timeMode">
      <el-select v-model="value" placeholder="出行方式" @change="changeMode">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <Legend
      v-show='showLegend'
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      options: [
        {
          value: "driving",
          label: "驾车",
        },
        {
          value: "cycling",
          label: "骑行",
        },
        {
          value: "walking",
          label: "步行",
        },
      ],
      title: "交通可达性",
      items: [
        {
          index: 1,
          text: "15分钟可达",
          style: "backgroundColor:rgba(213,0,0,0.6)",
        },
        {
          index: 2,
          text: "30分钟可达",
          style: "backgroundColor:rgba(244,81,30,0.6)",
        },
        {
          index: 3,
          text: "45分钟可达",
          style: "backgroundColor:rgba(0,230,118,0.6)",
        },
        {
          index: 4,
          text: "60分钟可达",
          style: "backgroundColor:rgba(25,118,210,0.6)",
        },
      ],
      value: "",
      mode: null,
      showLegend:false,
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let _this = this;
      window.MAP.getCanvas().style.cursor = "pointer";
      window.MAP.on("click", _this.getLngLat);
      window.MAP.setCenter([113.35, 23.1]);
      window.MAP.setZoom(6.5);
    },
    getLngLat(e) {
      let _this = this;
      var lngLat = e.lngLat;
      console.log(lngLat);
      var lng = lngLat.lng;
      var lat = lngLat.lat;
      _this.addTimeCircle(lng, lat);
      _this.showLegend = true;
    },
    changeMode(val) {
      this.mode = val;
      console.log(this.mode, "mode");
    },
    addTimeCircle(lng, lat) {
      let _this = this;
      var url15 =
        "https://api.mapbox.com/isochrone/v1/mapbox/" +
        _this.mode +
        "/" +
        lng +
        "," +
        lat +
        "?contours_minutes=15&polygons=true&access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";
      var url30 =
        "https://api.mapbox.com/isochrone/v1/mapbox/" +
        _this.mode +
        "/" +
        lng +
        "," +
        lat +
        "?contours_minutes=30&polygons=true&access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";
      var url45 =
        "https://api.mapbox.com/isochrone/v1/mapbox/" +
        _this.mode +
        "/" +
        lng +
        "," +
        lat +
        "?contours_minutes=45&polygons=true&access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";
      var url60 =
        "https://api.mapbox.com/isochrone/v1/mapbox/" +
        _this.mode +
        "/" +
        lng +
        "," +
        lat +
        "?contours_minutes=60&polygons=true&access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";

      _this.axios.get(url15).then((res) => {
        console.log(res, "15");
        if (window.MAP.getLayer("time15")) {
          window.MAP.removeLayer("time15");
        }
        if (window.MAP.getSource("time15")) {
          window.MAP.removeSource("time15");
        }
        window.MAP.addSource("time15", {
          type: "geojson",
          data: res.data,
        });
        window.MAP.addLayer({
          id: "time15",
          type: "fill",
          source: "time15",
          paint: {
            "fill-color": "#d50000",
            "fill-opacity": 0.5,
          },
          filter: ["==", "$type", "Polygon"],
        });
        var pointGeoJson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
            },
          ],
        };

        if (window.MAP.getLayer("address")) {
          window.MAP.removeLayer("address");
        }
        if (window.MAP.getSource("point")) {
          window.MAP.removeSource("point");
        }

        window.MAP.addSource("point", {
          type: "geojson",
          data: pointGeoJson,
        });

        window.MAP.addLayer({
          id: "address",
          type: "circle",
          source: "point",
          paint: {
            "circle-radius": 6,
            "circle-color": "#ffff00",
          },
        });
      });
      _this.axios.get(url30).then((res) => {
        console.log(res, "30");
        if (window.MAP.getLayer("time30")) {
          window.MAP.removeLayer("time30");
        }
        if (window.MAP.getSource("time30")) {
          window.MAP.removeSource("time30");
        }
        window.MAP.addSource("time30", {
          type: "geojson",
          data: res.data,
        });
        window.MAP.addLayer(
          {
            id: "time30",
            type: "fill",
            source: "time30",
            paint: {
              "fill-color": "#f4511e",
              "fill-opacity": 0.5,
            },
            filter: ["==", "$type", "Polygon"],
          },
          "time15"
        );
      });
      _this.axios.get(url45).then((res) => {
        console.log(res, "45");
        if (window.MAP.getLayer("time45")) {
          window.MAP.removeLayer("time45");
        }
        if (window.MAP.getSource("time45")) {
          window.MAP.removeSource("time45");
        }
        window.MAP.addSource("time45", {
          type: "geojson",
          data: res.data,
        });
        window.MAP.addLayer(
          {
            id: "time45",
            type: "fill",
            source: "time45",
            paint: {
              "fill-color": "#00e676",
              "fill-opacity": 0.5,
            },
            filter: ["==", "$type", "Polygon"],
          },
          "time30"
        );
      });
      _this.axios.get(url60).then((res) => {
        console.log(res, "60");
        if (window.MAP.getLayer("time60")) {
          window.MAP.removeLayer("time60");
        }
        if (window.MAP.getSource("time60")) {
          window.MAP.removeSource("time60");
        }
        window.MAP.addSource("time60", {
          type: "geojson",
          data: res.data,
        });
        window.MAP.addLayer(
          {
            id: "time60",
            type: "fill",
            source: "time60",
            paint: {
              "fill-color": "#1976d2",
              "fill-opacity": 0.5,
            },
            filter: ["==", "$type", "Polygon"],
          },
          "time45"
        );
        this.showlegend = true;
      });
    },
  },
  destroyed() {
    if (window.MAP.getLayer("address")) {
      window.MAP.removeLayer("address");
    }
    if (window.MAP.getSource("point")) {
      window.MAP.removeSource("point");
    }
    if (window.MAP.getLayer("time15")) {
      window.MAP.removeLayer("time15");
    }
    if (window.MAP.getSource("time15")) {
      window.MAP.removeSource("time15");
    }
    if (window.MAP.getLayer("time30")) {
      window.MAP.removeLayer("time30");
    }
    if (window.MAP.getSource("time30")) {
      window.MAP.removeSource("time30");
    }
    if (window.MAP.getLayer("time45")) {
      window.MAP.removeLayer("time45");
    }
    if (window.MAP.getSource("time45")) {
      window.MAP.removeSource("time45");
    }
    if (window.MAP.getLayer("time60")) {
      window.MAP.removeLayer("time60");
    }
    if (window.MAP.getSource("time60")) {
      window.MAP.removeSource("time60");
    }
    let _this = this;
    window.MAP.off("click", _this.getLngLat);
    window.MAP.getCanvas().style.cursor = "default";
  },
};
</script>
    
<style lang='scss' scoped>
.timeMode {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 40px;
  width: 100px;
  // background-color: aquamarine;
  z-index: 9999;
}

.el-select {
  width: 110px;
}
</style>