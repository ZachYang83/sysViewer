<template>
  <div>
    <div class="drawGroup">
      <div
        v-for="(item, index) in drawItems"
        :key="index"
        class="drawItem"
        @click.stop="addpolygon(index, item.val)"
        :class="{ isActive: position === index }"
      >
        <img
          :src="item.src"
          style="width: 25px; height: 25px; margin: 0 auto"
        />
      </div>
    </div>
    <div class="infoGroup" v-show="showInfoPan">
      <div
        class="infoItem"
        style="marginRight: 20px; backgroundColor: rgba(224, 90, 57, 0.5)"
      >
        <div class="icon">
          <img :src="infoImgs[0]" />
        </div>
        <div class="content">
          <div class="text">就业人口</div>
          <div class="value">{{ jiuye }}</div>
        </div>
      </div>
      <div
        class="infoItem"
        style="marginRight: 20px; backgroundColor: rgba(241, 151, 17, 0.5)"
      >
        <div class="icon">
          <img :src="infoImgs[1]" />
        </div>
        <div class="content">
          <div class="text">居住人口</div>
          <div class="value">{{ juzhu }}</div>
        </div>
      </div>
      <div class="infoItem" style="backgroundColor: rgba(62, 140, 110, 0.5)">
        <div class="icon">
          <img :src="infoImgs[2]" />
        </div>
        <div class="content">
          <div class="text">职住比</div>
          <div class="value">{{ percent }}</div>
        </div>
      </div>
    </div>
    <MulDataPan
      v-show="showDataPan"
      :tabItems="tabItems"
      :activeName="activeName"
      style="top: 120px; right: 70px; width: 350px; height: auto"
    >
      <div id="dataBody"></div>
    </MulDataPan>
  </div>
</template>

<script>
import * as turf from "@turf/turf";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import { circleEvt } from "utils/draw/circle.js";
import { polygonEvt } from "utils/draw/polygon.js";
import { rectangleEvt } from "utils/draw/rectangle.js";
import { deleteEvt } from "utils/draw/delete.js";
import {
  postPopData,
  postOccuData,
  postHjData,
  postNlData,
} from "api/population/queryMap.js";
import MulDataPan from "components/common/MulDataPan.vue";
let dataChart;
let popData;
let occuData;
let hjData;
let nlData;
export default {
  components: {
    MulDataPan,
  },
  data() {
    return {
      jiuye: 0,
      juzhu: 0,
      percent: 0,
      infoImgs: [
        require("assets/population/jiuye.png"),
        require("assets/population/juzhu.png"),
        require("assets/population/percent.png"),
      ],
      drawItems: [
        {
          index: 1,
          val: "circle",
          src: require("assets/drawControl/circle.png"),
        },
        {
          index: 2,
          val: "rectangle",
          src: require("assets/drawControl/rectangle.png"),
        },
        {
          index: 3,
          val: "polygon",
          src: require("assets/drawControl/polygon.png"),
        },
        {
          index: 4,
          val: "delete",
          src: require("assets/drawControl/delete.png"),
        },
      ],
      tabItems: [
        {
          name: "zhiye",
          label: "职业",
          text: "职 业",
        },
        {
          name: "huji",
          label: "户籍",
          text: "户 籍",
        },
        {
          name: "nianling",
          label: "年龄",
          text: "年 龄",
        },
        {
          name: "population",
          label: "分时人口",
          text: "分时人口",
        },
      ],
      activeName: "huji",
      position: "",
      showDataPan: false,
      showInfoPan: false,
    };
  },
  mounted() {
    this.init();
    this.initLayers();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.32, 23.11], 12);
    },
    initLayers() {
      var opacity = 0.3;
      add_wms(window.MAP, "stations_heatmap", opacity);
      var paint = {
        "line-color": "#df20df",
        "line-width": 2,
      };
      // add_tms(window.MAP, "gzdadushi", "line", paint);
    },
    addpolygon(index, val) {
      console.log(index,val,'jajfask');
      let _this = this;
      this.position = index;
      var features = [];
      switch (val) {
        case "circle":
          circleEvt(function () {
            var circle = window.MAP.getSource("circle");
            console.log(circle,'circle');
            features = circle._data.geometry.coordinates[0];
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "rectangle":
          rectangleEvt(function () {
            var rectangle = window.MAP.getSource("rectangle");
            console.log(rectangle,'rectangle');
            features = rectangle._data.features[0].geometry.coordinates[0];
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "polygon":
          polygonEvt(function () {
            var points_area = window.MAP.getSource("points-area");
            console.log(points_area,'points_area');
            points_area._data.features.forEach((element) => {
              if (!features.includes(element.geometry.coordinates)) {
                features.push(element.geometry.coordinates);
              }
            });
            features.push(features[0]);
            _this.loadWFS(features);
          }, window.MAP);
          break;
        case "delete":
          deleteEvt(window.MAP);
          break;
      }
    },
    loadWFS(features) {
      let _this = this;
      let ids = [];
      let ptsWithin;
      var searchWithin = turf.polygon([features]);
      this.axios
        .get("http:///8.134.70.156:8181/geoserver/wfs", {
          params: {
            service: "WFS",
            version: "1.1.0",
            request: "GetFeature",
            typeName: "	gpzi:stations",
            outputFormat: "application/json",
            srsName: "EPSG:4326",
            //  maxFeatures:200,
          },
        })
        .then((res) => {
          var stations = res.data.features;
          stations.forEach((item) => {
            // stations.push(item.geometry.coordinates);
            let pt = turf.point(item.geometry.coordinates);
            if (turf.booleanPointInPolygon(pt, searchWithin)) {
              ids.push(item.properties.UID_500m);
            }
          });
          _this.showDataPan = true;
          _this.showInfoPan = true;
          var dataDom = document.getElementById("dataBody");
          dataChart = echarts.init(dataDom);
          postPopData("/pop_perceive/gd-zy500/getPop", {
            ids: JSON.stringify(ids),
          }).then((res) => {
            popData = res.data.data;
            var datax = [];
            var datay = [];
            for (let i = 0; i < popData.length; i++) {
              datax.push(popData[i].time);
              datay.push(popData[i].sums);
            }
            var max = Math.max.apply(null, datay);
            var min = Math.min.apply(null, datay);
            this.juzhu = Math.round(min);
            this.jiuye = Math.round(max - min * 0.8 + min * 0.3);
            this.percent = ((this.jiuye - this.juzhu) / this.juzhu).toFixed(2);
            // _this.setPopData(popData);
          });
          postOccuData("/pop_perceive/gd-zy500/getOccu", {
            ids: JSON.stringify(ids),
          }).then((res) => {
            occuData = res.data.data;
            _this.setOccuData();
          });
          postHjData("/pop_perceive/gd-hj500/getHj", {
            ids: JSON.stringify(ids),
          }).then((res) => {
            hjData = res.data.data;
            // _this.setHjData();
          });
          postNlData("/pop_perceive/gd-nl500/getNl", {
            ids: JSON.stringify(ids),
          }).then((res) => {
            nlData = res.data.data;
          });
        });
    },
    setPopData() {
      console.log(popData, "popData");
      var datax = [];
      var datay = [];
      for (let i = 0; i < popData.length; i++) {
        datax.push(popData[i].time);
        datay.push(popData[i].sums);
      }
      var max = Math.max.apply(null, datay);
      var min = Math.min.apply(null, datay);
      var datax = datax.reverse();
      var bar_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          left: 60,
          right: 80,
          top: 40,
          bottom: 25,
        },
        yAxis: {
          name: "时",
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          data: datax,
          nameTextStyle: {
            fontSize: 12, //字体大小
          },
        },
        xAxis: {
          name: "人数",
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          nameTextStyle: {
            fontSize: 12, //字体大小
          },
        },
        color: "#00FFFF",
        series: [
          {
            type: "line",
            smooth: false,
            areaStyle: {},
            data: datay,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFFF",
                    fontSize: 10,
                  },
                },
              },
            },
          },
        ],
      };
      dataChart.setOption(bar_option);
    },
    setOccuData() {
      console.log(occuData, "occuData");
      this.$nextTick(() => {
        var getName = {
          adMedia: "广告媒体",
          architecture: "建筑",
          businessman: "商务人士",
          correspondence: "通信",
          eduTra: "教育培训",
          finance: "金融",
          indiBussiness: "个体客户",
          it: "it",
          logistics: "物流",
          manuIndustry: "制造业",
          medTreatment: "医疗",
          realEstate: "地产",
          salariatFixed: "工薪固定",
          salariatUnfixed: "工薪不固定",
          service: "服务",
          student: "学生",
          taxiDriver: "网约车司机",
        };
        var occu = occuData[0];
        var sortable = [];
        for (var key in occu) {
          if (occu[key] != null) {
            sortable.push([key, occu[key]]);
          }
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }

        let zyDatax = datax;
        let zyDatay = datay;
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          grid: {
            x: 80,
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
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
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
                color: "#00FFFF",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00FFFF",
              },
            },
          },
          color: "#00FFFF",
          series: [
            {
              type: "bar",
              data: datax,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#00FFFF",
                      fontSize: 10,
                    },
                  },
                },
              },
            },
          ],
        };
        dataChart.setOption(bar_option, true);
      });
    },
    setHjData() {
      console.log(hjData, "hjData");
      this.$nextTick(() => {
        var getName = {
          anhui: "安徽",
          beijing: "北京",
          chongqing: "重庆",
          fujian: "福建",
          gansu: "甘肃",
          guangdong: "广东",
          guangxi: "广西",
          guizhou: "贵州",
          hainan: "海南",
          hebei: "河北",
          heilongjiang: "黑龙江",
          henan: "河南",
          hubei: "湖北",
          hunan: "湖南",
          jiangsu: "江苏",
          jiangxi: "江西",
          jilin: "吉林",
          liaoning: "辽宁",
          neimenggu: "内蒙古",
          ningxia: "宁夏",
          qinghai: "青海",
          shandong: "山东",
          shanghai: "上海",
          shanxi: "山西",
          sichuan: "四川",
          sx: "陕西",
          tianjin: "天津",
          xinjiang: "新疆",
          xizang: "西藏",
          yunnan: "云南",
          zhejiang: "浙江",
        };
        var hj = hjData[0];
        var sortable = [];
        for (var key in hj) {
          if (hj[key] != null && key != "sb") sortable.push([key, hj[key]]);
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          grid: {
            x: 50,
            y: 10,
            y2: 20,
          },
          // dataZoom: [
          //   {
          //     type: "slider",
          //     show: true,
          //     yAxisIndex: 0,
          //     start: 50,
          //     end: 100,
          //   },
          // ],
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.02],
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
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
                color: "#00FFFF",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00FFFF",
              },
            },
          },
          color: "#00FFFF",
          series: [
            {
              type: "bar",
              data: datax,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#00FFFF",
                      fontSize: 10,
                    },
                  },
                },
              },
            },
          ],
        };
        dataChart.setOption(bar_option, true);
      });
    },
    setNlData() {
      console.log(nlData, "nlData");
      this.$nextTick(() => {
        var getName = {
          above65: ">65",
          betw611: "6-11",
          betw1215: "12-15",
          betw1618: "16-18",
          betw1922: "19-22",
          betw2325: "23-25",
          betw2634: "26-34",
          betw3545: "35-45",
          betw4655: "46-55",
          betw5665: "56-65",
        };
        var nl = nlData[0];
        var sortable = [];
        for (var key in nl) {
          if (nl[key] != null && key != "sb" && key != "totalPop") {
            sortable.push([key, nl[key]]);
          }
        }
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          grid: {
            x: 80,
            y: 10,
            y2: 40,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.02],
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
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
                color: "#00FFFF",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00FFFF",
              },
            },
          },
          color: "#00FFFF",
          series: [
            {
              type: "bar",
              data: datax,
              // barWidth: 12,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#00FFFF",
                      fontSize: 10,
                    },
                  },
                },
              },
            },
          ],
        };
        dataChart.setOption(bar_option, true);
      });
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["stations_heatmap",'gzdadushi']);
    deleteEvt(window.MAP);
  },
};
</script>

<style lang='scss' scoped>
.drawGroup {
  position: absolute;
  top: 30px;
  left: 10px;
  width: fit-content;
  height: auto;
  cursor: pointer;
  z-index: 999;
  // padding:3px;
  border-radius: 5px;
  background-color: aliceblue;

  .drawItem {
    width: 42px;
    height: 42px;
    // background-color: aquamarine;
    padding: 1px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-bottom: solid 2px darkgrey;
  }

  .drawItem:hover {
    background-color: rgba(102, 102, 102, 0.2);
  }

  div:not(:last-child) {
    border-bottom: solid 2px darkgrey;
  }

  .isActive {
    background-color: rgba(102, 102, 102, 0.4);
  }
}

#dataBody {
  width: 350px;
  height: 660px;
  // padding: 5px;
  box-sizing: border-box;
  z-index: 999;
}

.infoGroup {
  position: absolute;
  display: flex;
  top: 40px;
  right: 10px;
  width: 490px;
  height: 70px;
  padding: 5px;
  box-sizing: border-box;

  background-color: rgba(44, 47, 48, 0.7);
  z-index: 999;
  justify-content: space-evenly;

  .infoItem {
    display: flex;
    flex: 1;
    border-radius: 10px;
    // background-color: aqua;

    .icon {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      // background-color: aqua;
    }

    .content {
      display: flex;
      flex: 2;
      flex-direction: column;
      // background-color:aquamarine;

      .text {
        flex: 2;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: aliceblue;
        padding-right: 10px;
        font-weight: 600;
        font-size: 18px;
        // background-color:blueviolet;
      }

      .value {
        flex: 1.5;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: aliceblue;
        padding-right: 10px;
        // background-color:brown;
      }
    }
  }
}
</style>