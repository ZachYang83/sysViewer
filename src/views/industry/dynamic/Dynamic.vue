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
        <div style="font: bold 18px '微软雅黑'; marginBottom: 15px">行业</div>
        <template v-for="item in legendItems">
          <li :index="item.index" :key="item.key" class="legendItem">
            <div class="color" :style="item.style"></div>
            <div class="legendText">{{ item.text }}</div>
          </li>
        </template>
      </div>
    </Legend>
    <div class="czPop" ref="tablePan" id="tablePan">
      <span @click="showTable">企业动态</span>
      <Chart :cdata="cdata" />
    </div>
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
import Chart from "./Chart.vue";
let timer = null;
export default {
  data() {
    return {
      visible: false,
      zhankai: true,
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
      cdata: {
        category: [
          "2014及以前",
          "2015.6",
          "2015.12",
          "2016.6",
          "2016.12",
          "2017.6",
          "2017.12",
          "2018.6",
          "2018.12",
          "2019.6",
          "2019.12",
          "2020.6",
          "2020.12",
          "2021.6",
          "2021.12",
          "2022.6",
          "2022.8",
        ],
        barData: [
          6357, 6978, 7703, 8489, 9476, 10708, 11992, 13878, 15086, 16628,
          18643, 22564, 25192, 27633, 30227, 32261, 33009,
        ],
        rateData: [
          0, 620, 725, 786, 987, 1231, 1285, 1885, 1208, 543, 2014, 3922, 2628,
          2442, 2594, 2034, 748,
        ],
      },
    };
  },
  components: {
    Popup,
    Legend,
    DataBar,
    Chart,
  },
  mounted() {
    init_map(window.MAP, [113.351, 23.094], 13);
    this.initLayers();
    this.mouseEvent();
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
        filter: ["in", "objectid", ""],
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
    showTable() {
      var oDiv = document.getElementById("tablePan");
      let _this = this;
      var pan_width = this.$refs.tablePan.offsetWidth;
      console.log(pan_width, "");
      var Taget;
      if (this.zhankai) {
        Taget = 300;
      } else {
        Taget = pan_width + 300;
      }
      clearInterval(timer);
      timer = setInterval(function () {
        var speed = 0; //弹框的移动速度
        if (oDiv.offsetLeft > Taget) {
          speed = -100;
        } else {
          speed = 100;
        }
        if (oDiv.offsetLeft == Taget) {
          clearInterval(timer);
        } else {
          oDiv.style.left = oDiv.offsetLeft + speed + "px";
          if (parseInt(oDiv.style.left) < Taget) {
            oDiv.style.left = Taget + "px";
          }
          if (parseInt(oDiv.style.left) > Taget) {
            oDiv.style.left = Taget + "px";
          }
        }
      }, 30);
      this.zhankai = !this.zhankai;
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
    // background: #17c5a5;
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

.czPop {
  position: absolute;
  bottom: 20px;
  right: calc(300px - 100%);
  // right:-300px;
  height: 325px;
  width: calc(100% - 300px);
  z-index: 9999;
  background-color: rgba(44, 47, 48, 0.7);

  span {
    display: flex;
    width: 20px;
    height: 100px;
    position: absolute;
    right: calc(100% - 260px);
    left: -20px;
    bottom: 225px;
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