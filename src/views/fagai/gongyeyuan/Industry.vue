<template>
  <div>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
    <div class="timeLine" @changeData="changeData">
      <Timeline @changeData="changeLayer"></Timeline>
    </div>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <div class="title">
          <h2>工业园工作与流动人口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="idGongyeyuan"
              ref="gongyeyuan_pan"
              :datas="liuchuDatas"
            ></component>
          </keep-alive>
        </div>
        <div class="foot">
          <div
            class="foot-item"
            @click="idGongyeyuan = 'gyy_pop'"
            :class="{ active: idGongyeyuan == 'gyy_pop' }"
          >
            月度人口
          </div>
          <div
            class="foot-item"
            @click="idGongyeyuan = 'gyy_hj'"
            :class="{ active: idGongyeyuan == 'gyy_hj' }"
          >
            工作人口户籍
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Timeline from "./Timeline.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { getHuji } from "api/fagai/industry.js";
import gyy_hj from "../gongyeyuan/dataPan/Huji.vue";
import gyy_pop from "@/views/fagai/gongyeyuan/dataPan/Chart.vue";

let workData;
let liudongData;
export default {
  data() {
    return {
      showData: false,
      idGongyeyuan: "gyy_pop",
      liuchuDatas: {},
      title: "工作人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 20",
          style: "backgroundColor:RGBA(225,225,225)",
        },
        {
          index: 2,
          text: "20 - 50",
          style: "backgroundColor:RGBA(224,250,242)",
        },
        {
          index: 3,
          text: "50 - 100",
          style: "backgroundColor:RGBA(220,240,229)",
        },
        {
          index: 4,
          text: "100 - 200",
          style: "backgroundColor:RGBA(132,196,214)",
        },
        {
          index: 5,
          text: "200 - 300",
          style: "backgroundColor:RGBA(50,107,171)",
        },
        {
          index: 6,
          text: "300以上",
          style: "backgroundColor:RGBA(6,51,154)",
        },
      ],
      timeIndex: 202201,
      layerProp: {
        name: "广州-天河·公园智谷片区",
        id: 142,
      },
    };
  },
  components: {
    Legend,
    Timeline,
    gyy_hj,
    gyy_pop,
  },
  mounted() {
    this.init();
    this.loadWMS();
    this.mouseEvent();
  },
  methods: {
    init() {
      window.MAP.getCanvas().style.cursor = "pointer";
      init_map(window.MAP, [113.35, 22.9], 6.5);
    },
    loadWMS() {
      window.MAP.addSource("sfg_gongyeyuan", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_gongyeyuan@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "sfg_gongyeyuan",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "w202201"], 20],
            "RGBA(225,225,225,0.7)",
            ["<", ["get", "w202201"], 50],
            "RGBA(224,250,242,0.7)",
            ["<", ["get", "w202201"], 100],
            "RGBA(220,240,229,0.7)",
            ["<", ["get", "w202201"], 200],
            "RGBA(132,196,214,0.7)",
            ["<", ["get", "w202201"], 300],
            "RGBA(50,107,171,0.7)",
            "RGBA(6,51,154,0.7)",
          ],
        },
      });
      window.MAP.addLayer({
        id: "sfg_gongyeyuan_sym",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{Name}\n{w202201}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
         paint: {
          "text-color": "#ffffff",
        },
      });
      window.MAP.addLayer({
        id: "sfg_gongyeyuan-line",
        type: "line",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        paint: {
          "line-color": "#ff4081",
          "line-width": 1,
        },
      });
      window.MAP.addLayer({
        id: "sfg_gongyeyuan-hl",
        type: "line",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
          // "text-color": "#ffff00",
        },
        filter: ["in", "id", ""],
      });
    },
    changeLayer(index) {
      var field;
      var text;
      console.log(index, "index");
      switch (index) {
        case 0:
          field = "w202201";
          text = "{Name}\n{w202201}";
          break;
        case 1:
          field = "w202202";
          text = "{Name}\n{w202202}";
          break;
        case 2:
          field = "w202203";
          text = "{Name}\n{w202203}";
          break;
        case 3:
          field = "w202204";
          text = "{Name}\n{w202204}";
          break;
        case 4:
          field = "w202205";
          text = "{Name}\n{w202205}";
          break;
        case 5:
          field = "w202206";
          text = "{Name}\n{w202206}";
          break;
        case 6:
          field = "w202207";
          text = "{Name}\n{w202207}";
          break;
        case 7:
          field = "w202208";
          text = "{Name}\n{w202208}";
          break;
        case 8:
          field = "w202209";
          text = "{Name}\n{w202209}";
          break;
        case 9:
          field = "w202210";
          text = "{Name}\n{w202210}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 20],
          "RGBA(225,225,225,0.7)", //<10.8
          ["<", ["get", field], 50],
          "RGBA(224,250,242,0.7)", //>=10.8 & <17.2
          ["<", ["get", field], 100],
          "RGBA(220,240,229,0.7)",
          ["<", ["get", field], 200],
          "RGBA(132,196,214,0.7)",
          ["<", ["get", field], 300],
          "RGBA(50,107,171,0.7)",
          "RGBA(6,51,154,0.7)", // 默认值, >=50.1
        ],
      };
      var layoutO = {
        "icon-image": "",
        "text-field": text, //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.removeLayer("sfg_gongyeyuan");
      window.MAP.addLayer({
        id: "sfg_gongyeyuan",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "fill",
        paint: paintO,
      });
      window.MAP.removeLayer("sfg_gongyeyuan_sym");
      window.MAP.addLayer({
        id: "sfg_gongyeyuan_sym",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "symbol",
        layout: layoutO,
      });
      window.MAP.removeLayer("sfg_gongyeyuan-hl");
      window.MAP.addLayer({
        id: "sfg_gongyeyuan-hl",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "line",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "id", ""],
      });
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("click", _this.getInfo);
    },
    getInfo(e) {
      let _this = this;
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "sfg_gongyeyuan") {
        var props = features[0].properties;
        workData = [
          props["w202201"],
          props["w202202"],
          props["w202203"],
          props["w202204"],
          props["w202205"],
          props["w202206"],
          props["w202207"],
          props["w202208"],
          props["w202209"],
          props["w202210"],
        ];
        liudongData = [
          props["l202201"],
          props["l202202"],
          props["l202203"],
          props["l202204"],
          props["l202205"],
          props["l202206"],
          props["l202207"],
          props["l202208"],
          props["l202209"],
          props["l202210"],
        ];
        console.log(workData, "dfadfsa");
        window.MAP.setFilter("sfg_gongyeyuan-hl", [
          "in",
          "id",
          features[0].properties.id,
        ]);
        console.log(props, "props");
      }
      _this.layerProp = {
        id: props.id,
        name: props.name,
      };
      this.getData();
    },
    getData() {
      let _this = this;
      getHuji("/shengfagai/gongyeyuan-hj/getGyyHuji", {
        indId: _this.layerProp.id,
        time: _this.timeIndex,
      }).then((res) => {
        _this.liuchuDatas = {
          workData: workData,
          liudongData: liudongData,
          hujidata: res.data.data[0],
        };
        console.log(res.data, "res.data.data[0]");
        _this.showData = true;
        _this.$refs["gongyeyuan_pan"].setChart(_this.liuchuDatas);
      });
    },
    changeData(index) {
      this.timeIndex = index;
      console.log("父组件");
      console.log(this.timeIndex, "this.timeIndex");
      this.getData();
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, [
      "sfg_gongyeyuan-hl",
      "sfg_gongyeyuan_sym",
      "sfg_gongyeyuan-line",
      "sfg_gongyeyuan",
    ]);
    window.MAP.off("click", _this.getInfo);
  },
};
</script>

<style lang='scss' scoped>
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

.timeLine {
  position: absolute;
  bottom: 30px;
  width: 35%;
  right: 50%;
  transform: translateX(50%);
  height: 60px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 0px;
  border-radius: 40px;
}

.dataPan {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 40px;
  right: 10px;
  width: 0px;
  height: calc(100% - 50px);
  background: linear-gradient(to left, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat;
  background-size: 1px 15px, 15px 1px;
  background-color: rgba(44, 47, 48, 0.7);
  transition: width 0.25s;
  z-index: 999;
  &.active {
    width: 400px;
  }

  .item {
    height: 100%;
    flex: 1;

    .title {
      width: 100%;
      height: 50px;
      text-align: center;
      background-color: RGBA(8, 32, 52, 0.7);
      line-height: 50px;
      color: #bdbdbd;
    }
    .content {
      width: 100%;
      height: calc(100% - 90px);

      #data2019_2022 {
        width: 100%;
        height: 60%;
      }
    }
    .foot {
      display: flex;
      width: 100%;
      height: 40px;
      background-color: RGBA(8, 32, 52, 0.7);
    }

    .foot-item {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #bdbdbd;
      cursor: pointer;
    }
    .active {
      background-color: yellowgreen;
      color: #2a8d8d;
      font-size: 17px;
      font-weight: 800;
    }
  }

  .changzhu {
    border-right: #003366 2px solid;
  }

  .jiuye {
    border-right: #003366 2px solid;
  }
}
</style>
