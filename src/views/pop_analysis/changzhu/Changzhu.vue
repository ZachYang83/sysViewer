<template>
  <div>
    <div class="month_select">
      <span style="display: inline-block; width: 50px">年份：</span>
      <el-select
        placeholder="2020年5月"
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
    <div class="czPop" ref="tablePan" id="tablePan">
      <span @click="showTable">常住人口</span>
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Chart from "./Chart.vue";
let timer = null;
export default {
  data() {
    return {
      title: "图例",
      month_value: "",
      monthOptions: [
        {
          value: "2020",
          label: "2020年5月",
        },
        {
          value: "2021",
          label: "2021年5月",
        },
        {
          value: "2022",
          label: "2022年5月",
        },
      ],
      items: [
        {
          index: 1,
          text: "5万以下",
          style: "backgroundColor:rgba(225,225,225,0.8)",
        },
        {
          index: 2,
          text: "5万 - 10万",
          style: "backgroundColor:rgba(224,250,242,0.8)",
        },
        {
          index: 3,
          text: "10万 - 15万",
          style: "backgroundColor:rgba(220,240,229,0.8)",
        },
        {
          index: 4,
          text: "15万 - 20万",
          style: "backgroundColor:rgba(178,226,228,0.8)",
        },
        {
          index: 5,
          text: "20万 - 25万",
          style: "backgroundColor:rgba(132,196,214,0.8)",
        },
        {
          index: 6,
          text: "25万 - 30万",
          style: "backgroundColor:rgba(50,107,171,0.8)",
        },
        {
          index: 7,
          text: "30万以上",
          style: "backgroundColor:rgba(6,51,154,0.8)",
        },
      ],
      cdata: {
        category: [
          "202001",
          "202002",
          "202003",
          "202004",
          "202005",
          "202006",
          "202007",
          "202008",
          "202009",
          "202010",
          "202011",
          "202012",
          "202101",
          "202102",
          "202103",
          "202104",
          "202105",
          "202106",
          "202107",
          "202108",
          "202109",
          "202110",
          "202111",
          "202112",
          "202201",
          "202202",
          "202203",
          "202204",
          "202205"
        ],
        barData: [
          1391,
          1188,
          1614,
          1788,
          1804,
          1887,
          1934,
          1907,
          2015,
          1952,
          1980,
          2109,
          1763,
          1216,
          1713,
          1642,
          1725,
          1718,
          1648,
          1695,
          1863,
          1881,
          1904,
          1919,
          1661,
          1402,
          1901,
          1853,
          1875
        ],
        rateData:[
          0,0.15,0.36,0.11,0.01,0.05,0.02,-0.01,0.06,-0.03,0.01,0.07,-0.16,-0.31,0.41,-0.04,0.05,0,-0.04,0.03,0.1,0.01,0.01,0.01,-0.13,-0.16,0.36,-0.03,0.01
        ]
      },
      zhankai:true,
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
            ["<", ["get", "ky202005"], 5],
            "rgba(225,225,225,0.8)",
            ["<", ["get", "ky202005"], 10],
            "rgba(224,250,242,0.8)",
            ["<", ["get", "ky202005"], 15],
            "rgba(220,240,229,0.8)",
            ["<", ["get", "ky202005"], 20],
            "rgba(178,226,228,0.8)",
            ["<", ["get", "ky202005"], 25],
            "rgba(132,196,214,0.8)",
            ["<", ["get", "ky202005"], 30],
            "rgba(50,107,171,0.8)",
            "rgba(6,51,154,0.8)",
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
          "text-field": "{jiezhen}\n{ky202005}", //此属性为需要显示的字段
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
            case "2020":
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
                      ["<", ["get", "ky202005"], 5],
                      "rgba(225,225,225,0.8)",
                      ["<", ["get", "ky202005"], 10],
                      "rgba(224,250,242,0.8)",
                      ["<", ["get", "ky202005"], 15],
                      "rgba(220,240,229,0.8)",
                      ["<", ["get", "ky202005"], 20],
                      "rgba(178,226,228,0.8)",
                      ["<", ["get", "ky202005"], 25],
                      "rgba(132,196,214,0.8)",
                      ["<", ["get", "ky202005"], 30],
                      "rgba(50,107,171,0.8)",
                      "rgba(6,51,154,0.8)",
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
                    "text-field": "{jiezhen}\n{ky202005}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
            case "2021":
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
                      ["<", ["get", "ky202105"], 5],
                      "rgba(225,225,225,0.8)",
                      ["<", ["get", "ky202105"], 10],
                      "rgba(224,250,242,0.8)",
                      ["<", ["get", "ky202105"], 15],
                      "rgba(220,240,229,0.8)",
                      ["<", ["get", "ky202105"], 20],
                      "rgba(178,226,228,0.8)",
                      ["<", ["get", "ky202105"], 25],
                      "rgba(132,196,214,0.8)",
                      ["<", ["get", "ky202105"], 30],
                      "rgba(50,107,171,0.8)",
                      "rgba(6,51,154,0.8)",
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
                    "text-field": "{jiezhen}\n{ky202105}", //此属性为需要显示的字段
                    "text-size": 14,
                    "text-anchor": "top",
                  },
                });
              });
              break;
            case "2022":
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
                      ["<", ["get", "ky202205"], 5],
                      "rgba(225,225,225,0.8)",
                      ["<", ["get", "ky202205"], 10],
                      "rgba(224,250,242,0.8)",
                      ["<", ["get", "ky202205"], 15],
                      "rgba(220,240,229,0.8)",
                      ["<", ["get", "ky202205"], 20],
                      "rgba(178,226,228,0.8)",
                      ["<", ["get", "ky202205"], 25],
                      "rgba(132,196,214,0.8)",
                      ["<", ["get", "ky202205"], 30],
                      "rgba(50,107,171,0.8)",
                      "rgba(6,51,154,0.8)",
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
                    "text-field": "{jiezhen}\n{ky202205}", //此属性为需要显示的字段
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
    showTable(){
      var oDiv = document.getElementById('tablePan')
      let _this = this;
      var pan_width = this.$refs.tablePan.offsetWidth;
      console.log(pan_width,'');
      var Taget;
      if(this.zhankai){
        Taget = 250
      }else{
        Taget = pan_width + 260;
      }
      clearInterval(timer);
      timer=setInterval(function(){
            var speed=0;  //弹框的移动速度
            if(oDiv.offsetLeft > Taget)
            {
               speed=-100;
            }
            else
            {
               speed=100;
            }
              if(oDiv.offsetLeft == Taget)
             {
                 clearInterval(timer);
             }
             else
             {
              oDiv.style.left=oDiv.offsetLeft+speed+'px';
              if(parseInt(oDiv.style.left) < Taget){
                oDiv.style.left = Taget + 'px';
              }
              if(parseInt(oDiv.style.left) > Taget){
                oDiv.style.left = Taget + 'px';
              }
             }
          },30);
      this.zhankai = !this.zhankai;
    }
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
  width: 200px;
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

.czPop {
    position: absolute;
    bottom: 20px;
    right: calc(260px - 100%);
    // right:-300px;
    height: 325px;
    width: calc(100% - 260px);
    z-index: 9999;
    background-color: rgba(44, 47, 48, 0.7);

    span{
      display: flex;
      width:20px;
      height:100px;
      position:absolute;
      right:calc(100% - 260px); 
      left:-20px;
      bottom:225px;
      line-height:20px;
      background-color: aquamarine;
      border-radius:10px 0 0 10px;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
