<template>
  <div>
    <div class="tripMode">
      出行方式：<el-select
        placeholder="出发地"
        v-model="tripValue"
        @change="changeMode"
      >
        <el-option
          v-for="item in tripOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <data-bar
      v-show="showPie"
      :title="pieTitle"
      style="top: 30px; right: 10px; width: 356px; height: 330px"
    >
      <div id="pie_culdata"></div>
    </data-bar>
    <data-bar
      v-show="showBar"
      :title="barTitle"
      style="top: 380px; right: 10px; width: 356px; height: 460px"
    >
      <div id="bar_culdata"></div>
    </data-bar>
    <Legend
      v-show="showLegend"
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
  </div>
</template>

<script>
import DataBar from "components/common/DataBar_R.vue";
import Legend from "components/common/Legend.vue";
import { init_map } from "utils/initMap.js";
import { add_tms, addgeojson_S, addgeojson_L } from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";

let popup;
let mode = "o";
let pieData;
let barData;
let hoveredStateId = null;
let BASE_modeurl =
  "http://8.134.70.156:8090//pop_perceive/tra-popod/getOOnes?code=";
let BASE_sumurl =
  "http://8.134.70.156:8090//pop_perceive/tra-popod/getOOnesByStreet/?code=";
export default {
  data() {
    return {
      tripOptions: [
        {
          value: "o",
          label: "出发地",
        },
        {
          value: "d",
          label: "目的地",
        },
      ],
      tripValue: "",
      showPie: false,
      showBar: false,
      showLegend: false,
      pieTitle: "到各区货车联系强度占比",
      barTitle: "货车联系强度前十地区",
      title: "图例",
      items: [
        {
          index: 1,
          text: "5百以下",
          style: "backgroundColor:rgba(163,174,180,0.8)",
        },
        {
          index: 2,
          text: "5百 ~ 1千",
          style: "backgroundColor:rgba(69,101,141,0.8)",
        },
        {
          index: 3,
          text: "1千 ~ 5千",
          style: "backgroundColor:rgba(0,229,255,0.8)",
        },
        {
          index: 4,
          text: "5千 ~ 1万",
          style: "backgroundColor:rgba(255,255,193,0.8)",
        },
        {
          index: 5,
          text: "1万 ~ 10万",
          style: "backgroundColor:rgba(244,151,102,0.8)",
        },
        {
          index: 6,
          text: "10万以上",
          style: "backgroundColor:rgba(230,0,0,0.8)",
        },
      ],
    };
  },
  components: {
    DataBar,
    Legend,
  },
  mounted() {
    init_map(window.MAP, [113.35, 23.2], 8);
    this.initLayers();
    popup = new window.mapbox.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    this.hoverLayer();
  },
  methods: {
    changeMode(val) {
      let _this = this;
      mode = val;
      switch (val) {
        case "o":
          BASE_modeurl =
            "http://8.134.70.156:8090//tra_monitor/tra-carod/getOOnes?code=";
          BASE_sumurl =
            "http://8.134.70.156:8090//tra_monitor/tra-carod/getOOnesByStreet/?code=";
          _this.pieTitle = "到各区货车联系强度占比";
          _this.barTitle = "货车联系强度前十地区";
          break;
        case "d":
          BASE_modeurl =
            "http://8.134.70.156:8090//tra_monitor/tra-carod/getDOnes?code=";
          BASE_sumurl =
            "http://8.134.70.156:8090//tra_monitor/tra-carod/getDOnesByStreet/?code=";
          _this.pieTitle = "各区到此人口联系强度占比";
          _this.barTitle = "货车联系强度前十地区";
          break;
      }
    },
    initLayers() {
      var paint1 = {
        "fill-outline-color": "#9e9e9e",
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#627BC1",
          "#fff",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.1,
        ],
      };
      add_tms(window.MAP, "gfg_polygon", "fill", paint1);
      var paint2 = {
        "line-color": "#9e9e9e",
        "line-width": 1.1,
      };
      add_tms(window.MAP, "gfg_line", "line", paint2);
      var paint3 = {
        "line-color": "#ff6e40",
        "line-width": 2,
      };
      add_tms(window.MAP, "gfg", "line", paint3);
    },
    hoverLayer() {
      let _this = this;
      window.MAP.on("mousemove", "gfg_polygon", _this.onmousemove);
      window.MAP.on("mouseleave", "gfg_polygon", _this.onmouseleave);
      window.MAP.on("click", _this.onclick);
    },
    onmousemove(e) {
      window.MAP.getCanvas().style.cursor = "pointer";
      var coordinates = e.features[0].geometry.coordinates[0][0];
      if (coordinates.length != 2) {
        coordinates = coordinates[0];
      }
      var name = e.features[0].properties.xqcode;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      // popup.setLngLat(coordinates).setHTML(name).addTo(window.MAP);
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          window.MAP.setFeatureState(
            {
              source: "gfg_polygon",
              sourceLayer: "gfg_polygon",
              id: hoveredStateId,
            },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        window.MAP.setFeatureState(
          {
            source: "gfg_polygon",
            sourceLayer: "gfg_polygon",
            id: hoveredStateId,
          },
          { hover: true }
        );
      }
    },
    onmouseleave() {
      if (hoveredStateId !== null) {
        window.MAP.setFeatureState(
          {
            source: "gfg_polygon",
            sourceLayer: "gfg_polygon",
            id: hoveredStateId,
          },
          { hover: false }
        );
      }
      hoveredStateId = null;
      window.MAP.getCanvas().style.cursor = "";
      popup.remove();
    },
    onclick(e) {
      let _this = this;
      var bbox = [
        [e.point.x - 1, e.point.y - 1],
        [e.point.x + 1, e.point.y + 1],
      ];
      var features = window.MAP.queryRenderedFeatures(bbox, {
        layers: ["gfg_polygon"],
      });
      features.reduce(
        function (memo, feature) {
          if (
            feature.sourceLayer == "gfg_polygon" &&
            feature.properties.xqcode
          ) {
            var url = BASE_modeurl + feature.properties.xqcode;
            _this.axios.get(url).then((res) => {
              var data = res.data;
              _this.addLineLayer(data);
              barData = res.data.data.slice(0, 10);
              _this.addBarChart();
            });
            var sumurl = BASE_sumurl + feature.properties.xqcode;
            _this.axios.get(sumurl).then((res) => {
              pieData = res.data.data;
              _this.addPieChart();
            });
          } else {
            console.log(feature.properties);
          }
          return memo;
        },
        ["in", "xqcode"]
      );
    },
    addLineLayer(data) {
      let dataArray = data.data;
      if (dataArray.length != 0) {
        let arcsDataCreator_line = function () {
          const allParsedFeatures = {
            type: "FeatureCollection",
            features: [],
          };
          const allParsedFeatures2 = {
            type: "FeatureCollection",
            features: [],
          };
          for (let i = 0; i < dataArray.length; i++) {
            const { odis, ostr, ddis, dstr, olat, olng, dlng, dlat, sum } =
              dataArray[i];
            if (sum >= 5) {
              const start = [parseFloat(olng), parseFloat(olat)];
              const end = [parseFloat(dlng), parseFloat(dlat)];
              let oneFeatureParsed = {
                type: "Feature",
                properties: { od_count: parseInt(sum) },
                geometry: { type: "LineString", coordinates: [start, end] },
              };
              let pointCoor;
              let name;
              if (mode == "o") {
                pointCoor = end;
                name = dstr;
              } else if (mode == "d") {
                pointCoor = start;
                name = ostr;
              }
              let oneFeatureParsed2 = {
                type: "Feature",
                properties: { od_count: parseInt(sum), name: name + ":" + sum },
                geometry: { type: "Point", coordinates: pointCoor },
              };
              allParsedFeatures.features.push(oneFeatureParsed);
              allParsedFeatures2.features.push(oneFeatureParsed2);
            }
          }
          return [allParsedFeatures, allParsedFeatures2];
        };
        var dataList1 = arcsDataCreator_line()[0];
        var dataList2 = arcsDataCreator_line()[1];
        console.log(dataList1, dataList2, "dataList1");
        let level1 = 5,
          level2 = 10,
          level3 = 20,
          level4 = 50,
          level5 = 75,
          level6 = 100;
        removeLayers2(window.MAP, [
          "level1",
          "level2",
          "level3",
          "level4",
          "level5",
          "level6",
          "point_level4",
          "point_level5",
          "point_level6",
        ]);
        removeLayers(window.MAP, ["od_layer", "point_layer"]);

        addgeojson_S(window.MAP, "od_layer", dataList1);
        addgeojson_S(window.MAP, "point_layer", dataList2);

        addgeojson_L(window.MAP, "level1", "od_layer", {
          filter: ["<=", "od_count", level1],
          paint: {
            "line-color": "#A3AEB4", //4f55ff
            "line-width": 0.5,
            "line-opacity": 1,
          },
        });
        addgeojson_L(window.MAP, "level2", "od_layer", {
          filter: [
            "all",
            [">", "od_count", level1],
            ["<=", "od_count", level2],
          ],
          paint: {
            "line-color": "#45658D", //4f55ff
            "line-width": 1.5,
            "line-opacity": 1,
          },
        });
        addgeojson_L(window.MAP, "level3", "od_layer", {
          filter: [
            "all",
            [">", "od_count", level2],
            ["<=", "od_count", level3],
          ],
          paint: {
            "line-color": "#00e5ff", //4f55ff
            "line-width": 2.5,
            "line-opacity": 1,
          },
        });
        addgeojson_L(window.MAP, "level4", "od_layer", {
          filter: [
            "all",
            [">", "od_count", level3],
            ["<=", "od_count", level4],
          ],
          paint: {
            "line-color": "#FFFFC1", //4f55ff
            "line-width": 3.5,
            "line-opacity": 1,
          },
        });
        addgeojson_L(window.MAP, "level5", "od_layer", {
          filter: [
            "all",
            [">", "od_count", level4],
            ["<=", "od_count", level5],
          ],
          paint: {
            "line-color": "#F49766", //4f55ff
            "line-width": 4.5,
            "line-opacity": 1,
          },
        });
        addgeojson_L(window.MAP, "level6", "od_layer", {
          filter: [
            "all",
            [">", "od_count", level5],
            ["<=", "od_count", level6],
          ],
          paint: {
            "line-color": "#E60000", //4f55ff
            "line-width": 6,
            "line-opacity": 1,
          },
        });
        window.MAP.addLayer({
          id: "point_level4",
          source: "point_layer",
          type: "symbol",
          filter: [
            "all",
            [">", "od_count", level3],
            ["<=", "od_count", level4],
          ],
          layout: {
            "text-field": ["get", "name"],
            "text-size": 18,
          },
          paint: {
            "text-color": "#FFFFC1",
          },
        });
        window.MAP.addLayer({
          id: "point_level5",
          source: "point_layer",
          type: "symbol",
          filter: [
            "all",
            [">", "od_count", level4],
            ["<=", "od_count", level5],
          ],
          layout: {
            "text-field": ["get", "name"],
            "text-size": 18,
          },
          paint: {
            "text-color": "#F49766",
          },
        });

        window.MAP.addLayer({
          id: "point_level6",
          source: "point_layer",
          type: "symbol",
          filter: [
            "all",
            [">", "od_count", level5],
            ["<=", "od_count", level6],
          ],
          layout: {
            "text-field": ["get", "name"],
            "text-size": 18,
          },
          paint: {
            "text-color": "#E60000",
          },
        });
      }
      this.showLegend = true;
    },

    addBarChart() {
      this.showBar = true;
      this.$nextTick(() => {
        var bar_Dom = document.getElementById("bar_culdata");
        var bar_Chart = echarts.init(bar_Dom);
        let bar_datax = [];
        let bar_datay = [];
        for (let i = barData.length - 1; i >= 0; i--) {
          bar_datax.push(barData[i].sum);
          if (mode == "o") {
            bar_datay.push(barData[i].dstr);
          } else if (mode == "d") {
            bar_datay.push(barData[i].ostr);
          }
        }
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}{c}",
          },
          grid: {
            x: 50,
            y: 20,
            y2: 20,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "#fff",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          yAxis: {
            type: "category",
            data: bar_datay,
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              rotate: 45,
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          color: "#f44336",
          series: [
            {
              type: "bar",
              data: bar_datax,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "white",
                      fontSize: 13,
                    },
                  },
                },
              },
            },
          ],
        };
        bar_Chart.setOption(bar_option);
      });
    },

    addPieChart() {
      this.showPie = true;
      this.$nextTick(() => {
        var pie_Dom = document.getElementById("pie_culdata");
        var pie_Chart = echarts.init(pie_Dom);
        let pie_data = [];
        for (let i = 0; i < pieData.length; i++) {
          var obj;
          if (mode == "o") {
            obj = { value: pieData[i].sum, name: pieData[i].ddis };
          } else if (mode == "d") {
            obj = { value: pieData[i].sum, name: pieData[i].odis };
          }
          pie_data.push(obj);
        }
        console.log(pie_data, "pie_data");
        var pie_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}{d}%",
          },
          itemStyle: {
            borderRadius: 5,
            borderColor: "#fff",
            borderWidth: 1,
          },
          series: [
            {
              name: "到各市人口联系强度占比",
              type: "pie",
              radius: ["25%", "90%"],
              avoidLabelOverlap: true,
              label: {
                show: true,
                position: "inside",
                formatter: "{b}{d}%",
                color: "#fff",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "15",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: pie_data,
            },
          ],
        };
        pie_Chart.setOption(pie_option);
      });
    },
    renderEcharts() {
      this.addBarChart();
      this.addPieChart();
    },
  },
  destroyed() {
    removeLayers2(window.MAP, [
      "level1",
      "level2",
      "level3",
      "level4",
      "level5",
      "level6",
      "point_level4",
      "point_level5",
      "point_level6",
    ]);
    removeLayers(window.MAP, [
      "gfg_polygon",
      "gfg_line",
      "gfg",
      "od_layer",
      "point_layer",
    ]);
    let _this = this;
    window.MAP.off("mousemove", "gfg_polygon", _this.onmousemove);
    window.MAP.off("mouseleave", "gfg_polygon", _this.onmouseleave);
    window.MAP.off("click", _this.onclick);
  },
};
</script>

<style lang="scss" scoped>
.tripMode {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 50px;
  width: 200px;
  color: aliceblue;
  // background-color: aliceblue;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-select {
  width: 110px;
}
#pie_culdata {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}

#bar_culdata {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}

.map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  margin-left: 20px;
  font-family: Arial, sans-serif;
  overflow: hidden;
  border-radius: 3px;
  z-index: 8888;
}
</style>