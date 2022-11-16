<template>
  <div>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
    <div class="timeLine">
      <Timeline @changeData="changeLayer"></Timeline>
    </div>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <div class="title">
          <h2>流出人口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="isLiuchu"
              ref="liuchu_pan"
              :datas="liuchuDatas"
            ></component>
          </keep-alive>
        </div>
        <div class="foot">
          <div
            class="foot-item"
            @click="isLiuchu = 'liuchu_hj'"
            :class="{ active: isLiuchu == 'liuchu_hj' }"
          >
            户籍
          </div>
          <div
            class="foot-item"
            @click="isLiuchu = 'liuchu_zb'"
            :class="{ active: isLiuchu == 'liuchu_zb' }"
          >
            占比
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
import { getHuji, getQuxian } from "api/fagai/liuchu.js";
import liuchu_hj from "../migrant/dataPan/Liuchu_huji.vue";
import liuchu_zb from "@/views/fagai/migrant/dataPan/Liuchu_zhanbi.vue";

export default {
  data() {
    return {
      showData: false,
      isLiuchu: "liuchu_hj",
      liuchuDatas:{},
      title: "流出人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 5",
          style: "backgroundColor:RGB(225,225,225)",
        },
        {
          index: 2,
          text: "5 - 10",
          style: "backgroundColor:RGB(224,250,242)",
        },
        {
          index: 3,
          text: "10 - 15",
          style: "backgroundColor:RGB(220,240,229)",
        },
        {
          index: 4,
          text: "15 - 30",
          style: "backgroundColor:RGB(132,196,214)",
        },
        {
          index: 5,
          text: "30 - 60",
          style: "backgroundColor:RGB(50,107,171)",
        },
        {
          index: 6,
          text: "60 - 120",
          style: "backgroundColor:RGB(6,51,154)",
        },
      ],
    };
  },
  components: {
    Legend,
    Timeline,
    liuchu_hj,
    liuchu_zb,
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
      window.MAP.addSource("sfg_liuchu", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_liuchu@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      window.MAP.addLayer({
        id: "sfg_liuchu",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "1mon"], 5],
            "RGB(225,225,225)",
            ["<", ["get", "1mon"], 10],
            "RGB(224,250,242)",
            ["<", ["get", "1mon"], 15],
            "RGB(220,240,229)",
            ["<", ["get", "1mon"], 30],
            "RGB(132,196,214)",
            ["<", ["get", "1mon"], 60],
            "RGB(50,107,171)",
            "RGB(6,51,154)",
          ],
        },
      });
      window.MAP.addLayer({
        id: "sfg_liuchu_sym",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{county}\n{1mon}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
      window.MAP.addLayer({
        id: "sfg_liuchu-hl",
        type: "line",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "cityid", ""],
      });
    },
    changeLayer(index) {
      var field;
      var text;
      console.log(index, "index");
      switch (index) {
        case 0:
          field = "1mon";
          text = "{county}\n{1mon}";
          break;
        case 1:
          field = "2mon";
          text = "{county}\n{2mon}";
          break;
        case 2:
          field = "3mon";
          text = "{county}\n{3mon}";
          break;
        case 3:
          field = "4mon";
          text = "{county}\n{4mon}";
          break;
        case 4:
          field = "5mon";
          text = "{county}\n{5mon}";
          break;
        case 5:
          field = "6mon";
          text = "{county}\n{6mon}";
          break;
        case 6:
          field = "7mon";
          text = "{county}\n{7mon}";
          break;
        case 7:
          field = "8mon";
          text = "{county}\n{8mon}";
          break;
        case 8:
          field = "9mon";
          text = "{county}\n{9mon}";
          break;
        case 9:
          field = "10mon";
          text = "{county}\n{10mon}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 5],
          "RGB(225,225,225)", //<10.8
          ["<", ["get", field], 10],
          "RGB(224,250,242)", //>=10.8 & <17.2
          ["<", ["get", field], 15],
          "RGB(220,240,229)",
          ["<", ["get", field], 30],
          "RGB(132,196,214)",
          ["<", ["get", field], 60],
          "RGB(50,107,171)",
          "RGB(6,51,154)", // 默认值, >=50.1
        ],
      };
      var layoutO = {
        "icon-image": "",
        "text-field": text, //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.removeLayer("sfg_liuchu");
      window.MAP.addLayer({
        id: "sfg_liuchu",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        type: "fill",
        paint: paintO,
      });
      window.MAP.removeLayer("sfg_liuchu_sym");
      window.MAP.addLayer({
        id: "sfg_liuchu_sym",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        type: "symbol",
        layout: layoutO,
      });
      window.MAP.removeLayer("sfg_liuchu-hl");
      window.MAP.addLayer({
        id: "sfg_liuchu-hl",
        source: "sfg_liuchu",
        "source-layer": "sfg_liuchu",
        type: "line",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "cityid", ""],
      });
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("click", _this.getInfo);
    },
    getInfo(e) {
      let _this = this;
      let monthData;
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "sfg_liuchu") {
        var props = features[0].properties;
        monthData = [props['1mon'],props['2mon'],props['3mon'],props['4mon'],props['5mon'],props['6mon'],props['7mon'],props['8mon'],props['9mon']]
        console.log(monthData,'dfadfsa');
        window.MAP.setFilter("sfg_liuchu-hl", [
          "in",
          "cityid",
          features[0].properties.cityid,
        ]);
        console.log(props, "props");
      }
       getQuxian("/shengfagai/liuchu-qx/getQuxian", {
        city: props.city,
        time: 202201,
      }).then((res) => {
        _this.liuchuDatas={
          monthdata:monthData,
          countydata:res.data.data,
        }
      });
      let params = {
        cityid: props.cityid,
        time: 202201,
      };
      getHuji("/shengfagai/liuchu-hj/getHuji", params).then((res) => {
        _this.liuchuDatas.huji = res.data.data[0];
        console.log(_this.liuchuDatas, "_this.liuchuDatas");
        _this.showData = true;
        _this.$refs["liuchu_pan"].setChart(_this.liuchuDatas);
      });
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, ["sfg_liuchu-hl", "sfg_liuchu_sym", "sfg_liuchu"]);
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
      background-color: RGBA(8, 32, 52, 0.8);
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
      background-color: RGBA(8, 32, 52, 0.8);
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