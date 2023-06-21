<template>
  <div>
    <Popup
      id="infoBox"
      v-model="visible"
      title="属性"
      class="info-box"
      @onCancel="onCancel"
    >
      <el-table :data="propsData" border style="width: 100%" height="400">
        <el-table-column align="center" prop="prop" label="属性" width="100">
        </el-table-column>
        <el-table-column align="center" prop="value" label="值" width="195">
        </el-table-column>
      </el-table>
    </Popup>
    <Legend v-model="showLegend" title="图例" class="legend-box">
      <div class="legendBody">
        <div style="font: bold 18px '微软雅黑'; marginbottom: 15px">行业</div>
        <template v-for="item in legendItems">
          <li :index="item.index" :key="item.key" class="legendItem">
            <div class="color" :style="item.style"></div>
            <div class="legendText">{{ item.text }}</div>
          </li>
        </template>
      </div>
    </Legend>
    <dataBar
      title="行业占比"
      style="top: 40px; right: 10px; width: 360px; height: 35%"
    >
      <div id="pie_data"></div>
    </dataBar>
    <dataBar
      title="行业数量"
      style="bottom: 10px; right: 10px; width: 360px; height: 58%"
    >
      <div id="bar_data"></div>
    </dataBar>
  </div>
</template>

<script>
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  add_tms2,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import Popup from "@/components/Popup.vue";
import Legend from "@/components/Popup.vue";
// import DataBar from "@/components/DataBar.vue";
import DataBar from "components/common/DataBar_R.vue";
export default {
  data() {
    return {
      visible: false,
      propsData: [],
      showLegend: true,
      legendItems: [
        { index: 1, text: "采矿业", style: "backgroundColor:#dce775" },
        {
          index: 2,
          text: "电力、热力、燃气及水生产和供应业",
          style: "backgroundColor:#ff80ab",
        },
        { index: 3, text: "房地产业", style: "backgroundColor:#4fc3f7" },
        { index: 4, text: "国际组织", style: "backgroundColor:#ba68c8" },
        { index: 5, text: "建筑业", style: "backgroundColor:#ff9800" },
        {
          index: 6,
          text: "交通运输、仓储和邮政业",
          style: "backgroundColor:#69f0ae",
        },
        { index: 7, text: "教育", style: "backgroundColor:#b388ff" },
        { index: 8, text: "金融业", style: "backgroundColor:#1de9b6" },
        {
          index: 9,
          text: "居民服务、修理和其他服务业",
          style: "backgroundColor:#ffff00",
        },
        {
          index: 10,
          text: "科学研究和技术服务业",
          style: "backgroundColor:#ffff00",
        },
        {
          index: 11,
          text: "农、林、牧、渔业",
          style: "backgroundColor:#ffd54f",
        },
        { index: 12, text: "批发和零售业", style: "backgroundColor:#aeea00" },
        {
          index: 13,
          text: "水利、环境和公共设施管理业",
          style: "backgroundColor:#64b5f6",
        },
        { index: 14, text: "卫生和社会工作", style: "backgroundColor:#ffb74d" },
        {
          index: 15,
          text: "文化、体育和娱乐业",
          style: "backgroundColor:#00e5ff",
        },
        {
          index: 16,
          text: "信息传输、软件和信息技术服务业",
          style: "backgroundColor:#ff4081",
        },
        { index: 17, text: "制造业", style: "backgroundColor:#e040fb" },
        { index: 18, text: "住宿和餐饮业", style: "backgroundColor:#00e5ff" },
        {
          index: 19,
          text: "租赁和商务服务业",
          style: "backgroundColor:#ff4081",
        },
      ],
    };
  },
  components: {
    Popup,
    Legend,
    DataBar,
  },
  mounted() {
    init_map(window.MAP, [113.351, 23.094], 13);
    this.initLayers();
    this.mouseEvent();
    this.pie_chart();
    this.bar_chart();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["pz_hongxian"]);
      add_wms(window.MAP, "pz_hongxian");
      var circle = {
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
        "circle-color": [
          "match",
          ["get", "SECTOR"],
          "采矿业",
          "#dce775",
          "电力、热力、燃气及水生产和供应业",
          "#ff80ab",
          "房地产业",
          "#4fc3f7",
          "国际组织",
          "#ba68c8",
          "建筑业",
          "#ff9800",
          "交通运输、仓储和邮政业",
          "#69f0ae",
          "教育",
          "#b388ff",
          "金融业",
          "#1de9b6",
          "居民服务、修理和其他服务业",
          "#ffff00",
          "科学研究和技术服务业",
          "#ffff00",
          "农、林、牧、渔业",
          "#ffd54f",
          "批发和零售业",
          "#aeea00",
          "水利、环境和公共设施管理业",
          "#64b5f6",
          "卫生和社会工作",
          "#ffb74d",
          "文化、体育和娱乐业",
          "#00e5ff",
          "信息传输、软件和信息技术服务业",
          "#ff4081",
          "制造业",
          "#e040fb",
          "住宿和餐饮业",
          "#00e5ff",
          "租赁和商务服务业",
          "#ff4081",
          "#d4e157",
        ],
      };
      add_tms(window.MAP, "pz_qiye", "circle", circle);

      window.MAP.addLayer({
        id: "pz_qiye-hl",
        type: "circle",
        source: "pz_qiye",
        "source-layer": "pz_qiye",
        paint: {
          "circle-color": "#18ffff",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["in", "CODE", ""],
      });
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("mousemove", _this.cursorMove);
      window.MAP.on("click", _this.getInfo);
    },
    cursorMove(e) {
      window.MAP.getCanvas().style.cursor = "pointer";
    },
    getInfo(e) {
      let _this = this;
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "pz_qiye") {
        var props = features[0].properties;
        window.MAP.setFilter("pz_qiye-hl", [
          "in",
          "CODE",
          features[0].properties.CODE,
        ]);
        _this.propsData = [
          {
            prop: "企业名称",
            value: props["NAME"],
          },
          {
            prop: "地址",
            value: props["ADDRESS"],
          },
          {
            prop: "所属行业",
            value: props["SECTOR"],
          },
          {
            prop: "注册时间",
            value: props["DOE"],
          },
          {
            prop: "企业类型",
            value: props["TYPE"],
          },
          {
            prop: "登记状态",
            value: props["CODE"],
          },
          {
            prop: "经营范围",
            value: props["SERVICE"],
          },
        ];
      }
      _this.visible = true;
      var infoBox = document.getElementById("infoBox");
      infoBox.style.top = e.originalEvent.clientY - 120 + "px";
      infoBox.style.left = e.originalEvent.clientX + 40 + "px";
    },
    onCancel() {
      this.visible = false;
    },
    pie_chart() {
      var pie_Dom = document.getElementById("pie_data");
      var pie_Chart = echarts.init(pie_Dom);
      var pie_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}{d}%",
        },
        series: [
          {
            name: "行业占比",
            type: "pie",
            radius: ["40%", "97%"],
            // selectedMode: true,
            itemStyle: {
              normal: {
                borderRadius: 5,
                borderColor: "#fff",
                borderWidth: 2,
                label: {
                  show: true,
                  position: "inner",
                  textStyle: {
                    color: "#fff",
                    fontSize: 13,
                  },
                  formatter: "{b}\n{d}%",
                },
                labelLine: {
                  show: false,
                },
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#ba68c8",
                    "#dce775",
                    "#ff80ab",
                    "#ffd54f",
                    "#64b5f6",
                    "#1de9b6",
                    "#69f0ae",
                    "#b388ff",
                    "#ffb74d",
                    "#4fc3f7",
                    "#ff9800",
                    "#ffff00",
                    "#00e5ff",
                    "#e040fb",
                    "#ff4081",
                    "#ffff00",
                    "#00e5ff",
                    "#ff4081",
                    "#aeea00",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}\n{d}%",
                },
              },
            },
            data: [
              { value: 1, name: " 国际组织" },
              { value: 6, name: " 采矿业" },
              { value: 32, name: "电力、热力、燃气及水生产和供应业" },
              { value: 45, name: " 农、林、牧、渔业" },
              { value: 108, name: " 水利、环境和公共设施" },
              { value: 183, name: " 金融业" },
              { value: 322, name: " 交通运输、仓储和邮政业" },
              { value: 347, name: " 教育" },
              { value: 350, name: " 卫生和社会工作" },
              { value: 884, name: " 房地产业" },
              { value: 1120, name: " 建筑业" },
              { value: 1178, name: " 居民服务、修理和其他服务业" },
              { value: 1678, name: " 文化、体育和娱乐业" },
              { value: 1836, name: " 制造业" },
              { value: 2660, name: " 信息传输、软件和信息技术服务业" },
              { value: 3811, name: " 科学研究和技术服务业" },
              { value: 5194, name: " 住宿和餐饮业" },
              { value: 5952, name: " 租赁和商务服务业" },
              { value: 15174, name: " 批发和零售业" },
            ],
          },
        ],
      };
      pie_Chart.setOption(pie_option);
      pie_Chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 5,
      });
    },
    bar_chart() {
      var bar_Dom = document.getElementById("bar_data");
      var bar_Chart = echarts.init(bar_Dom);
      var datax = [
        1, 6, 32, 45, 108, 183, 322, 347, 350, 884, 1120, 1178, 1678, 1836,
        2660, 3811, 5194, 5952, 15174,
      ];
      var datay = [
        "国际组织",
        "采矿业",
        "电力、热力、燃气及水生产和供应业",
        "农、林、牧、渔业",
        "水利、环境和公共设施管理业",
        "金融业",
        "交通运输、仓储和邮政业",
        "教育",
        "卫生和社会工作",
        "房地产业",
        "建筑业",
        "居民服务、修理和其他服务业",
        "文化、体育和娱乐业",
        "制造业",
        "信息传输、软件和信息技术服务业",
        "科学研究和技术服务业",
        "住宿和餐饮业",
        "租赁和商务服务业",
        "批发和零售业",
      ];
      var bar_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}{c}",
        },
        grid: {
          x: 100,
          y: 10,
          y2: 20,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false,
          },
          axisLabel: {
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
          data: datay,
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
        series: [
          {
            type: "bar",
            data: datax,
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#ba68c8",
                    "#dce775",
                    "#ff80ab",
                    "#ffd54f",
                    "#64b5f6",
                    "#1de9b6",
                    "#69f0ae",
                    "#b388ff",
                    "#ffb74d",
                    "#4fc3f7",
                    "#ff9800",
                    "#ffff00",
                    "#00e5ff",
                    "#e040fb",
                    "#ff4081",
                    "#ffff00",
                    "#00e5ff",
                    "#ff4081",
                    "#aeea00",
                  ];
                  return colorList[params.dataIndex];
                },
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
    },
    renderEcharts() {
      this.pie_chart();
      this.bar_chart();
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, ["pz_qiye-hl", "pz_qiye", "pz_hongxian"]);
    window.MAP.off("click", _this.getInfo);
    window.MAP.off("mousemove", _this.cursorMove);
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  position: absolute;
  width: 300px;
  height: auto;
}

.legend-box {
  position: absolute;
  width: 200px;
  height: 300px;
  bottom: 10px;
  left: 10px;
}

.legendBody {
  width: 100%;
  height: 280px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px;
  background-color: rgba(38, 40, 41, 0.9);
  color: #fff;
}
::-webkit-scrollbar {
  display: none;
}

.legendItem {
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .color {
    display: flex;
    flex: 1;
    height: 20px;
    margin: 0 10px;
    border-radius: 7px;
  }

  .legendText {
    display: flex;
    flex: 4;
    height: 30px;
    color: #fff;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    font-size: 15px;
  }
}
.legendItem:last-child {
  margin-bottom: 0px;
}

#pie_data {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}

#bar_data {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}
</style>