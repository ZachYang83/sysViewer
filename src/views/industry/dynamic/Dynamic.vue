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
} from "utils/loadLayer2.js";
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
      zhankai:true,
      propsData: [],
      showLegend: true,
      legendItems: [
        { index: 1, text: "批发和零售业", style: "backgroundColor:#f78380" },
        {
          index: 2,
          text: "租赁和商务服务业",
          style: "backgroundColor:#f6829e",
        },
        {
          index: 3,
          text: "科学研究和技术服务",
          style: "backgroundColor:#ff4000",
        },
        {
          index: 4,
          text: "文化、体育和娱乐业",
          style: "backgroundColor:#ff809f",
        },
        { index: 5, text: "信息传输、软件", style: "backgroundColor:#809fff" },
        { index: 6, text: "住宿和餐饮业", style: "backgroundColor:#f42646" },
        {
          index: 7,
          text: "居民服务、修理和其他",
          style: "backgroundColor:#dbdd74",
        },
        { index: 8, text: "建筑业", style: "backgroundColor:#ffbf00" },
        { index: 9, text: "房地产业", style: "backgroundColor:#ffff6b" },
        {
          index: 10,
          text: "交通运输、仓储和邮电",
          style: "backgroundColor:#adadad",
        },
        { index: 11, text: "制造业", style: "backgroundColor:#b58b5f" },
        { index: 12, text: "教育", style: "backgroundColor:#ff80ff" },
        { index: 13, text: "金融业", style: "backgroundColor:#ff0000" },
        { index: 14, text: "卫生和社会工作", style: "backgroundColor:#f78380" },
        {
          index: 15,
          text: "水利、环境和公共设施",
          style: "backgroundColor:#00ffff",
        },
        {
          index: 16,
          text: "农、林、牧、渔业",
          style: "backgroundColor:#00ff80",
        },
        { index: 17, text: "其他", style: "backgroundColor:#d4e157" },
        { index: 18, text: "采矿业", style: "backgroundColor:#4d3900" },
        {
          index: 19,
          text: "电力、热力、燃气",
          style: "backgroundColor:#0099cc",
        },
        {
          index: 19,
          text: "电力、热力、燃气",
          style: "backgroundColor:#0099cc",
        },
      ],
      cdata: {
        category: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
        ],
        barData: [
          78, 80, 94, 178, 159, 145, 166, 162, 182, 238, 292, 352, 322, 388,
          609, 608, 853, 1094, 1064, 832, 724, 3,
        ],
        rateData: [
          0, 2, 14, 84, -19, -14, 21, -4, 20, 56, 54, 60, -30, 66, 221, -1,
          245, 241, -30, -232, -108, -721,
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
    init_map(window.MAP, [113.297084, 23.140441], 14);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["hhg-hongxian"]);
      add_wms(window.MAP, "hhg-hongxian");
      var circle = {
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
        "circle-color": [
          "match",
          ["get", "行业"],
          "采矿业",
          "rgba(77,57,0,1)",
          "电力、热力、燃气及",
          "rgba(0,153,204,1)",
          "房地产业",
          "rgba(255,255,107,1)",
          "公共管理、社会保障",
          "rgba(255,128,191,1)",
          "建筑业",
          "rgba(255,191,0,1)",
          "交通运输、仓储和邮",
          "rgba(173,173,173,1)",
          "教育",
          "rgba(255,128,255,1)",
          "金融业",
          "rgba(255,0,0,1)",
          "居民服务、修理和其",
          "rgba(219,221,116,1)",
          "科学研究和技术服务",
          "rgba(255,64,0,1)",
          "农、林、牧、渔业",
          "rgba(0,255,128,1)",
          "批发和零售业",
          "rgba(247,131,128,1)",
          "水利、环境和公共设",
          "rgba(0,255,255,1)",
          "卫生和社会工作",
          "rgba(247,131,128,1)",
          "文化、体育和娱乐业",
          "rgba(255,128,159,1)",
          "信息传输、软件和信",
          "rgba(128,159,255,1)",
          "制造业",
          "rgba(181,139,95,1)",
          "住宿和餐饮业",
          "rgba(244,38,70,1)",
          "租赁和商务服务业",
          "rgba(246,130,158,1)",
          "#d4e157",
        ],
      };
      add_tms2(window.MAP, "hhg-qiye", "circle", circle);
      

      window.MAP.addLayer({
        id: "hhg-qiye-hl",
        type: "circle",
        source: "hhg-qiye",
        "source-layer": "hhg-qiye",
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
      if (features[0].layer.id == "hhg-qiye") {
        var props = features[0].properties;
        window.MAP.setFilter("hhg-qiye-hl", [
          "in",
          "objectid",
          features[0].properties.objectid,
        ]);
        _this.propsData = [
          {
            prop: "企业名称",
            value: props["企业名"],
          },
          {
            prop: "地址",
            value: props["s_add"],
          },
          {
            prop: "所属行业",
            value: props["行业"],
          },
          {
            prop: "注册时间",
            value: props["成立日"],
          },
          {
            prop: "企业类型",
            value: props["企业类"],
          },
          {
            prop: "登记状态",
            value: props["登记状"],
          },
          {
            prop: "经营范围",
            value: props["经营范"],
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
    removeLayers(window.MAP, ["hhg-qiye-hl", "hhg-qiye","hhg-hongxian"]);
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
  background-color: rgba(38,40,41,0.9);
  color:#fff;
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