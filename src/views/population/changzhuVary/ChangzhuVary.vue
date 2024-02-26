<template>
  <div>
    <div class="month_select">
      <span style="display: inline-block; width: 50px">对比：</span>
      <el-select
        placeholder="2022年5月对比2021年5月"
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
    <!-- <div class="chartPan" id="resident_liushi">
      <span @click="showTable">流失前十</span>
      <Chart :cdata="cdata" />
    </div> -->
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Chart from "./Chart.vue";
let timer = null;
export default {
  data() {
    return {
      title: "人口变化",
      month_value: "",
      monthOptions: [
        {
          value: "2020_2022",
          label: "2022年5月对比2020年5月",
        },
        {
          value: "2021_2022",
          label: "2022年5月对比2021年5月",
        },
      ],
      items: [
        {
          index: 1,
          text: "-2万以下",
          style: "backgroundColor:rgba(49,54,149,80)",
        },
        {
          index: 2,
          text: "-2万 - -1万",
          style: "backgroundColor:rgba(116,173,209,80)",
        },
        {
          index: 3,
          text: "-1万 - 0",
          style: "backgroundColor:rgba(224,243,248,80)",
        },
        {
          index: 4,
          text: "0 - 1万",
          style: "backgroundColor:rgba(254,224,144,80)",
        },
        {
          index: 5,
          text: "1万 - 5万",
          style: "backgroundColor:rgba(244,109,67,80)",
        },
        {
          index: 6,
          text: "5万以上",
          style: "backgroundColor:rgba(165,0,38,80)",
        },
      ],
      cdata: {
        category: [
          "番禺区洛浦街道",
          "白云区嘉禾街道",
          "天河区长兴街道",
          "黄埔区南岗街道",
          "黄埔区云埔街道",
          "黄埔区穗东街道",
          "荔湾区桥中街道",
          "番禺区大石街道",
          "番禺区市桥街道",
          "黄埔区新龙镇",
          "海珠区南洲街道",
          "海珠区瑞宝街道",
          "白云区白云湖街道",
          "黄埔区大沙街道",
          "海珠区素社街道",
        ],
        barData: [
          -4.28, -3.83, -3.0, -2.95, -2.58, -2.46, -2.14, -2.03, -1.72, -1.69,
          -1.62, -1.61, -1.55, -1.34, -1.33,
        ],
      },
      zhankai: true,
    };
  },
  components: {
    Legend,
    Chart,
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
      if (window.MAP.getLayer("wlsys-changzhu_pop")) {
        window.MAP.removeLayer("wlsys-changzhu_pop");
      }
      window.MAP.addSource("wlsys-changzhu_pop", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Awlsys-changzhu_pop@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "wlsys-changzhu_pop",
        source: "wlsys-changzhu_pop",
        "source-layer": "wlsys-changzhu_pop",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "21to22"], -2],
            "rgba(49,54,149,80)",
            ["<", ["get", "21to22"], -1],
            "rgba(116,173,209,80)",
            ["<", ["get", "21to22"], 0],
            "rgba(224,243,248,80)",
            ["<", ["get", "21to22"], 1],
            "rgba(254,224,144,80)",
            ["<", ["get", "21to22"], 5],
            "rgba(244,109,67,80)",
            "rgba(165,0,38,80)",
          ],
        },
      });
      window.MAP.addLayer({
        id: "wlsys-changzhu_pop_sym",
        source: "wlsys-changzhu_pop",
        "source-layer": "wlsys-changzhu_pop",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{jiezhen}\n{21to22}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
    },
    changeMonth(e) {
      var layers = window.MAP.getStyle().layers;
      window.MAP.removeLayer("wlsys-changzhu_pop");
      window.MAP.removeLayer("wlsys-changzhu_pop_sym");
      layers.forEach((element) => {
        let _this = this;
        if (element.id == "wlsys-changzhu_pop") {
          switch (e) {
            case "2020_2022":
              _this.$nextTick(() => {
                window.MAP.addLayer({
                  id: "wlsys-changzhu_pop",
                  source: "wlsys-changzhu_pop",
                  "source-layer": "wlsys-changzhu_pop",
                  type: "fill",
                  paint: {
                    "fill-outline-color": "#455a64",
                    "fill-color": [
                      "case",
                      ["<", ["get", "20to22"], -2],
                      "rgba(49,54,149,80)",
                      ["<", ["get", "20to22"], -1],
                      "rgba(116,173,209,80)",
                      ["<", ["get", "20to22"], 0],
                      "rgba(224,243,248,80)",
                      ["<", ["get", "20to22"], 1],
                      "rgba(254,224,144,80)",
                      ["<", ["get", "20to22"], 5],
                      "rgba(244,109,67,80)",
                      "rgba(165,0,38,80)",
                    ],
                  },
                });
                window.MAP.addLayer({
                  id: "wlsys-changzhu_pop_sym",
                  source: "wlsys-changzhu_pop",
                  "source-layer": "wlsys-changzhu_pop",
                  type: "symbol",
                  layout: {
                    "icon-image": "",
                    "text-field": "{jiezhen}\n{20to22}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
            case "2021_2022":
              _this.$nextTick(() => {
                window.MAP.addLayer({
                  id: "wlsys-changzhu_pop",
                  source: "wlsys-changzhu_pop",
                  "source-layer": "wlsys-changzhu_pop",
                  type: "fill",
                  paint: {
                    "fill-outline-color": "#455a64",
                    "fill-color": [
                      "case",
                      ["<", ["get", "21to22"], -2],
                      "rgba(49,54,149,80)",
                      ["<", ["get", "21to22"], -1],
                      "rgba(116,173,209,80)",
                      ["<", ["get", "21to22"], 0],
                      "rgba(224,243,248,80)",
                      ["<", ["get", "21to22"], 1],
                      "rgba(254,224,144,80)",
                      ["<", ["get", "21to22"], 5],
                      "rgba(244,109,67,80)",
                      "rgba(165,0,38,80)",
                    ],
                  },
                });
                window.MAP.addLayer({
                  id: "wlsys-changzhu_pop_sym",
                  source: "wlsys-changzhu_pop",
                  "source-layer": "wlsys-changzhu_pop",
                  type: "symbol",
                  layout: {
                    "icon-image": "",
                    "text-field": "{jiezhen}\n{21to22}", //此属性为需要显示的字段
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
    showTable() {
      var oDiv = document.getElementById("resident_liushi");
      var mapdiv = document.getElementById("map");
      console.log(mapdiv.style.width, "R");
      console.log(oDiv.style.width, "L");
      var Taget;
      if (this.zhankai) {
        Taget = 1445;
      } else {
        Taget = 1745;
      }
      console.log(oDiv.style.right);
      clearInterval(timer);
      timer = setInterval(function () {
        var speed = 0; //弹框的移动速度
        if (oDiv.offsetLeft > Taget) {
          speed = -20;
        } else {
          speed = 20;
        }
        if (oDiv.offsetLeft == Taget) {
          clearInterval(timer);
        } else {
          console.log(oDiv.offsetLeft);
          oDiv.style.left = oDiv.offsetLeft + speed + "px";
        }
      }, 30);
      this.zhankai = !this.zhankai;
    },
  },

  destroyed() {
    if (window.MAP.getLayer("wlsys-changzhu_pop")) {
      window.MAP.removeLayer("wlsys-changzhu_pop");
    }
    if (window.MAP.getLayer("wlsys-changzhu_pop_sym")) {
      window.MAP.removeLayer("wlsys-changzhu_pop_sym");
    }
    window.MAP.removeSource("wlsys-changzhu_pop");
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

#resident_liushi {
  position: absolute;
  top: 40px;
  right: -300px;
  // right:-300px;
  height: 70%;
  width: 300px;
  z-index: 9999;
  background-color: rgba(44, 47, 48, 0.7);

  span {
    display: flex;
    width: 20px;
    height: 100px;
    position: absolute;
    right: 300px;
    left: -20px;
    top: 0px;
    line-height: 20px;
    background-color: aquamarine;
    border-radius: 10px 0 0 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }
}
</style>


