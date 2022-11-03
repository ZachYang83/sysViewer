<template>
  <div>
    <div class="month_select">
      <span style="display: inline-block; width: 50px">对比：</span>
      <el-select
        placeholder="2022年5月较2019年5月"
        v-model="month_value"
        @change="changeMonth"
      >
        <el-option
          v-for="item in monthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <Legend
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
      title: "人口变化",
      month_value: "",
      monthOptions: [
        {
          value: "2022_2019",
          label: "2022年5月较2019年5月",
        },
        {
          value: "2021_2019",
          label: "2021年5月较2019年5月",
        },
        {
          value: "2020_2019",
          label: "2020年5月较2019年5月",
        },
      ],
      items: [
        {
          index: 1,
          text: "-10万以下",
          style: "backgroundColor:rgb(29,78,155)",
        },
        {
          index: 2,
          text: "-10万 - -8万",
          style: "backgroundColor:rgb(82,136,198)",
        },
        {
          index: 3,
          text: "-8万 - -5万",
          style: "backgroundColor:rgb(178,226,228)",
        },
        {
          index: 4,
          text: "-5万 - 0",
          style: "backgroundColor:rgb(224,250,242)",
        },
        {
          index: 5,
          text: "0 - 5万",
          style: "backgroundColor:rgb(251,194,65)",
        },
        {
          index: 6,
          text: "5万 - 10万",
          style: "backgroundColor:rgb(237,117,81)",
        },
        {
          index: 7,
          text: "10万以上",
          style: "backgroundColor:rgb(214,47,39)",
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
      if (window.MAP.getLayer("wlsys-zhuliu_pop")) {
        window.MAP.removeLayer("wlsys-zhuliu_pop");
      }
      window.MAP.addSource("wlsys-zhuliu_pop", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Awlsys-zhuliu_pop@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "wlsys-zhuliu_pop",
        source: "wlsys-zhuliu_pop",
        "source-layer": "wlsys-zhuliu_pop",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "22to19"], -10],
            "rgb(29,78,155)",
            ["<", ["get", "22to19"], -8],
            "rgb(82,136,198)",
            ["<", ["get", "22to19"], -5],
            "rgb(178,226,228)",
            ["<", ["get", "22to19"], 0],
            "rgb(224,250,242)",
            ["<", ["get", "22to19"], 5],
            "rgb(251,194,65)",
            ["<", ["get", "22to19"], 10],
            "rgb(237,117,81)",
            "rgb(214,47,39)",
          ],
        },
      });
      window.MAP.addLayer({
        id: "wlsys-zhuliu_pop_sym",
        source: "wlsys-zhuliu_pop",
        "source-layer": "wlsys-zhuliu_pop",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{jiezhen}\n{22to19}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
    },
    changeMonth(e) {
      var layers = window.MAP.getStyle().layers;
      window.MAP.removeLayer("wlsys-zhuliu_pop");
      window.MAP.removeLayer("wlsys-zhuliu_pop_sym");
      layers.forEach((element) => {
        let _this = this;
        if (element.id == "wlsys-zhuliu_pop") {
          switch (e) {
            case "2022_2019":
              _this.$nextTick(() => {
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "fill",
                  paint: {
                    "fill-outline-color": "#455a64",
                    "fill-color": [
                      "case",
                      ["<", ["get", "22to19"], -10],
                      "rgb(29,78,155)",
                      ["<", ["get", "22to19"], -8],
                      "rgb(82,136,198)",
                      ["<", ["get", "22to19"], -5],
                      "rgb(178,226,228)",
                      ["<", ["get", "22to19"], 0],
                      "rgb(224,250,242)",
                      ["<", ["get", "22to19"], 5],
                      "rgb(251,194,65)",
                      ["<", ["get", "22to19"], 10],
                      "rgb(237,117,81)",
                      "rgb(214,47,39)",
                    ],
                  },
                });
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop_sym",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "symbol",
                  layout: {
                    "icon-image": "",
                    "text-field": "{jiezhen}\n{22to19}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
            case "2021_2019":
              _this.$nextTick(() => {
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "fill",
                  paint: {
                    "fill-outline-color": "#455a64",
                    "fill-color": [
                      "case",
                      ["<", ["get", "21to19"], -10],
                      "rgb(29,78,155)",
                      ["<", ["get", "21to19"], -8],
                      "rgb(82,136,198)",
                      ["<", ["get", "21to19"], -5],
                      "rgb(178,226,228)",
                      ["<", ["get", "21to19"], 0],
                      "rgb(224,250,242)",
                      ["<", ["get", "21to19"], 5],
                      "rgb(251,194,65)",
                      ["<", ["get", "21to19"], 10],
                      "rgb(237,117,81)",
                      "rgb(214,47,39)",
                    ],
                  },
                });
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop_sym",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "symbol",
                  layout: {
                    "icon-image": "",
                    "text-field": "{jiezhen}\n{21to19}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
            case "2020_2019":
              _this.$nextTick(() => {
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "fill",
                  paint: {
                    "fill-outline-color": "#455a64",
                    "fill-color": [
                      "case",
                      ["<", ["get", "20to19"], -10],
                      "rgb(29,78,155)",
                      ["<", ["get", "20to19"], -8],
                      "rgb(82,136,198)",
                      ["<", ["get", "20to19"], -5],
                      "rgb(178,226,228)",
                      ["<", ["get", "20to19"], 0],
                      "rgb(224,250,242)",
                      ["<", ["get", "20to19"], 5],
                      "rgb(251,194,65)",
                      ["<", ["get", "20to19"], 10],
                      "rgb(237,117,81)",
                      "rgb(214,47,39)",
                    ],
                  },
                });
                window.MAP.addLayer({
                  id: "wlsys-zhuliu_pop_sym",
                  source: "wlsys-zhuliu_pop",
                  "source-layer": "wlsys-zhuliu_pop",
                  type: "symbol",
                  layout: {
                    "icon-image": "",
                    "text-field": "{jiezhen}\n{20to19}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
          }
        }
      });
    },
  },

  destroyed() {
    if (window.MAP.getLayer("wlsys-zhuliu_pop")) {
      window.MAP.removeLayer("wlsys-zhuliu_pop");
    }
    if (window.MAP.getLayer("wlsys-zhuliu_pop_sym")) {
      window.MAP.removeLayer("wlsys-zhuliu_pop_sym");
    }
    window.MAP.removeSource("wlsys-zhuliu_pop");
  },
};
</script>

<style lang='scss' scoped>
.month_select {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 50px;
  width: 250px;
  color: aliceblue;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
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


